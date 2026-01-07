import React from 'react'

const MyAccount = () => {
  return (
    <section className='w-full'>
      <form action="" className='w-full flex flex-col gap-6'>
        <h3>Account Details</h3>
        <label className='w-full'><span className='form-title'>FIRST NAME *</span><input required type="text" placeholder='First name' className="input-field" /></label>
        <label className='w-full'><span className='form-title'>LAST NAME *</span><input required type="text" placeholder='Last name' className="input-field" /></label>
        <label className='w-full'><span className='form-title'>EMAIL *</span><input required type="email" placeholder='Email' className="input-field" /></label>
        <label className='w-full'><span className='form-title'>PHONE NUMBER *</span><input required type="tel" placeholder='Phone number' className="input-field" /></label>
        
        <h3 className='mt-6'>Password</h3>
        <label className='w-full'><span className='form-title'>FIRST NAME *</span><input required type="text" placeholder='First name' className="input-field" /></label>
        <label className='w-full'><span className='form-title'>LAST NAME *</span><input required type="text" placeholder='Last name' className="input-field" /></label>
        <label className='w-full'><span className='form-title'>EMAIL *</span><input required type="email" placeholder='Email' className="input-field" /></label>
        <label className='w-full'><span className='form-title'>PHONE NUMBER *</span><input required type="tel" placeholder='Phone number' className="input-field" /></label>
        <button className="w-full block mt-4 submit-button">Save Changes</button>
      </form>
    </section>
  )
}

export default MyAccount
