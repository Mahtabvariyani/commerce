import React from 'react'
import Container from '../components/Container'
import FormWrap from '../components/FormWrap'
import LogInForm from './LogInForm'
import { getCurrentUser } from '@/actions/getCurrentUser'

const page = async () => {
  const currentUser = await getCurrentUser()
  return (
    <Container>
        <FormWrap>
            <LogInForm currentUser={currentUser}/>
        </FormWrap>
      
    </Container>
  )
}

export default page
