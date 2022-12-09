import React from 'react'
import Button from '../Global/Button'
import LoadingSpin from '../Global/LoadingSpin'
import Input from '../Global/Input'
import { Formik } from 'formik'
import { supabase } from '../../supabase/supabase'

function Register({toggleForm, refreshUser}) {
  return (
    <div className="w-full max-w-md mx-auto mt-20">
      <Formik
        initialValues={{email: '', password: '', confirm_password: ''}}
        validate={values => {
          const errors = {};
          if (values.password !== values.confirm_password) errors.confirm_password = 'Confirm password does not match password'
          return errors;
        }}
        onSubmit={
          async (values, {setSubmitting, setStatus}) => {
            setSubmitting(true)

            let { error } = await supabase.auth.signUp({
              email: values.email,
              password: values.password
            })

            if (error) {
              setStatus(error.message)
            } else {
              refreshUser()
            }            
          }
        }
      >
        {({values, errors, status, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
          <form onSubmit={handleSubmit}>
            <Input name="email" placeholder="Email" className="w-full" type="text" required onChange={handleChange} onBlur={handleBlur} value={values.email}/>
            <Input name="password" placeholder="Password"
              className="mt-2 w-full" type="password"
                required onChange={handleChange} onBlur={handleBlur} value={values.password}
                error={errors.confirm_password}/>
            <Input name="confirm_password" placeholder="Confirm password"
              className="mt-2 w-full" type="password"
              required onChange={handleChange} onBlur={handleBlur} value={values.confirm_password}
              error={errors.confirm_password}/>
            {errors.confirm_password && (<p className="my-2 text-center text-orange-300">{errors.confirm_password}</p>)}
            <div className="flex gap-x-2 first-line:w-full mt-2">
              <Button className="basis-1/2" outline="true" onClick={() => toggleForm(false)} type="button">
                Login
              </Button>
              <Button className="basis-1/2" type="submit" disabled={isSubmitting} >
                {isSubmitting ? <LoadingSpin/> : "Register"}
              </Button>
            </div>
            {status && (<p className="mt-6 text-center text-dark-300">{status}</p>)}
          </form>
        )}
      </Formik>
    </div>
  )
}

export default Register
