import { Formik } from 'formik'
import React from 'react'
import { supabase } from '../../supabase/supabase'
import Button from '../Global/Button'
import Input from '../Global/Input'
import LoadingSpin from '../Global/LoadingSpin'

function Login({toggleForm, refreshUser}) {

  return (
    <div className="w-full max-w-md mx-auto">

      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={
          async (values, {setSubmitting, setStatus}) => {
            setSubmitting(true)
            const { error } = await supabase.auth.signInWithPassword({
              email: values.email,
              password: values.password,
            })

            if (error) {
              setStatus(error.message)
            } else {
              refreshUser()
            }
          }
        }
      >
        {({values, status, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
          <form onSubmit={handleSubmit}>
            <Input name="email" placeholder="Email" className="w-full" type="email" required onChange={handleChange} onBlur={handleBlur} value={values.email}/>
            <Input name="password" placeholder="Password" className="mt-2 w-full" type="password" required onChange={handleChange} onBlur={handleBlur} value={values.password}/>
            <div className="flex gap-x-2 first-line:w-full mt-2">
              <Button className="basis-1/2" outline="true" onClick={() => toggleForm(true)} type="button">
                Register
              </Button>
              <Button className="basis-1/2" type="submit" disabled={isSubmitting}>
                {isSubmitting ? <LoadingSpin/> : "Login"}
              </Button>
            </div>
      
            {status && <p className="mt-6 text-center text-dark-300">{status}</p>}
          </form>
        )}
      </Formik>

      



      
      
    </div>
  )
}

export default Login
