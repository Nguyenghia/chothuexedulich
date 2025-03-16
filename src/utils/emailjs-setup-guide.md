
# EmailJS Setup Guide

To set up EmailJS to receive booking form submissions in your email:

1. **Create an EmailJS account**:
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/) and sign up for a free account.

2. **Create an Email Service**:
   - In your EmailJS dashboard, go to "Email Services" and click "Add New Service".
   - Choose your email provider (Gmail, Outlook, etc.) and follow the authentication steps.
   - Note the Service ID - you'll need it for the form.

3. **Create an Email Template**:
   - Go to "Email Templates" and click "Create New Template".
   - Design your email template. Here's a suggested format:

   ```
   Subject: New Tour Booking: {{tour_name}}

   New booking details:

   Name: {{from_name}}
   Gender: {{gender}}
   Phone: {{phone}}
   Address: {{address}}
   
   Tour: {{tour_name}}
   Departure Date: {{departure_date}}
   Return Date: {{return_date}}
   
   Passengers:
   - Adults: {{adults}}
   - Children: {{children}}
   
   Vehicle Type: {{car_type}}-seater
   
   Additional Message:
   {{message}}
   ```

   - Note the Template ID - you'll need it for the form.

4. **Find your User ID**:
   - Go to "Account" > "API Keys" and copy your Public Key.
   - This is your User ID needed for the form.

5. **Update your BookingForm.tsx file**:
   - Replace the following constants with your actual values:
     - EMAILJS_SERVICE_ID: Your EmailJS service ID
     - EMAILJS_TEMPLATE_ID: Your EmailJS template ID
     - EMAILJS_USER_ID: Your EmailJS user ID (public key)

6. **Test the form**:
   - Fill out the booking form on your website and submit it.
   - Check your email to ensure the submission was received correctly.

EmailJS free tier allows 200 emails per month, which should be sufficient for most small websites. If you need more, consider upgrading to a paid plan.
