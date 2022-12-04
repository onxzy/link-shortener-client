import React, { useState } from 'react'
import LoadingSpin from '../Global/LoadingSpin'
import Button from '../Global/Button'
import Input from '../Global/Input'
import { Formik } from 'formik'
import { config, databases } from '../../appwrite/appwrite'
import { Permission, Query, Role } from 'appwrite'

function LinkForm({user, triggerRefreshLinks}) {

  const SHORT_PLACEHOLDER = 'https://l.onxzy.dev/'

  const [success, setSuccess] = useState(false);

  let toggleSuccess_TO;
  function toggleSuccess() {
    setSuccess(true);
    if (toggleSuccess_TO) clearTimeout(toggleSuccess_TO)
    toggleSuccess_TO = setTimeout(() => {
      setSuccess(false);
      toggleSuccess_TO = null
    }, 5000);
  }

  return (
    <div className="w-full mt-20">
      <Formik
        initialValues={{link: '', short: SHORT_PLACEHOLDER}}
        validate={async (values) => {
          const errors = {};

          if (values.short.substring(0, SHORT_PLACEHOLDER.length) !== SHORT_PLACEHOLDER) {
            errors.short = `Short link must start with ${SHORT_PLACEHOLDER}`
            return errors;
          }

          const short = values.short.substring(SHORT_PLACEHOLDER.length)

          if (short.length <= 3) {
            errors.short = `Short link must be at least 4 characters long.`
            return errors;
          }

          if (!(/^[A-Za-z0-9öø-ÿ]+([_-][A-Za-z0-9À-ÖØ-öø-ÿ]+)*$/.test(short))) {
            errors.short = `Short link invalid : Please enter letters, numbers, and _ or -, but not multiple underscores or dashes in a row.`
            return errors;
          }

          try {
            const list = await databases.listDocuments(config.db, config.collection, [
              Query.equal('short', short)
            ])
            if (list.total > 0) errors.short = `Short link unavailable`
            return errors;
          } catch (error) {
            return errors;
          }
        }}
        // validateOnChange={false}
        onSubmit={
          async (values, {setSubmitting, setStatus, resetForm}) => {
            setSubmitting(true)

            try {
              await databases.createDocument(
                config.db, config.collection,
                'unique()',
                {dest: values.link, userId: user.$id, short: values.short.substring(SHORT_PLACEHOLDER.length)},
                [
                  Permission.delete(Role.user(user.$id))
                ])
            } catch (err) {
              console.error(err);
              setStatus(err.message);
            }

            resetForm()
            triggerRefreshLinks()
            navigator.clipboard.writeText(values.short)
            toggleSuccess()
            setSubmitting(false)

          }
        }
      >
        {({values, errors, status, handleChange, handleBlur, handleSubmit, isSubmitting, isValidating}) => (
          <form onSubmit={handleSubmit}>
            <Input name="link" placeholder="Paste link here"
              className="w-full" type="url" required
              onChange={handleChange} onBlur={handleBlur} value={values.link}/>
            <div className="flex w-full  mt-2">
              <div className="relative basis-10/12">
                <Input name="short" placeholder={SHORT_PLACEHOLDER}
                  className="w-full" type="url" required
                  onChange={(e) => {
                    if (e.target.value.indexOf(SHORT_PLACEHOLDER) !== 0) {
                      e.target.value = SHORT_PLACEHOLDER;
                    }
                    handleChange(e)
                  }} onBlur={handleBlur} value={values.short}
                  error={errors.short}/>
                {isValidating && (<div className="absolute top-0 right-0 h-full pr-4 text-dark-300 flex items-center">
                  <LoadingSpin/>
                </div>)}
              </div>
              

              <Button className="basis-2/12 ml-2" type="submit" disabled={isSubmitting}>
                {isSubmitting ? <LoadingSpin/> : "Shorten"}
              </Button>
            </div>

            {errors.short && (<p className="my-2 text-center text-orange-300">{errors.short}</p>)}
            {status && (<p className="mt-6 text-center text-dark-300">{status}</p>)}
            {success && (<p className="mt-6 text-center text-green-400">New link copied to clipboard !</p>)}
            

          </form>
        )}
      </Formik>
    </div>
  )
}

export default LinkForm
