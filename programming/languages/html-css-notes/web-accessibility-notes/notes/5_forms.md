# Accessible Form Validation and Error Recovery

## Intro
Provide meaningful errors when users are filling out or have submitted a form
```
<!-- Example 1: Huh? -->
<div class='input-error'>Error: Invalid input.</div>

<!-- Example 2: That makes more sense. -->
<div class='input-error'>Error: Email is invalid.</div>

<!-- Example 3: Even better! -->
<div class='input-error'>Error: 'JohnSmith@@test.com' is not valid. Example of a valid email: example@yourdomain.com.</div>
```
- Ex. 1: We don't know what field was invalid.
- Ex. 2: We know which field was invalid. But we could improve this and say why it was invalid.
- Ex. 3: We know the email was invalid, and gave an example of a valid email.

More ways to provide meaningful text is with instructions. Such as 'password must contain at least one upper case and lower case character...'.

## Building Usuable Forms
Here's what we need to do:
1. Provide all necessary instructions and cues
2. Form controls need to have labels using the label element
3. We should use fieldset and legend to associate groups of checkbxoes and radio buttons
4. Reading and navigation order makes sense.
5. Forms can be completed via the keyboard.


### Example 1
```
<label for="firstname">First Name
<span style="color:red">(required)</span></label><br>
<input type="text" name="firstname" id="firstname" required>
```
When a field is required, we can use aria-required="true" or required to show to screen readers that a field is required.


### Couple ways to do errors

- Error alert, then focus: Here we alert the user that an error is present and then focus on the form control element. This is typically done with JavaScript alert box. A disadvantage of this approach is only one error is indicated and addressed at a time.

- Errors on top: Here the error message is put on the top of the form. Here the focus is set to the error message with JavaScript's focus() so that the screen reader or keyboard user doesn't have to find the error message. The advantage is that all of your error elements can be addressed.

- Inline errors: Displaying error messages in the form and next to the form control that they talk about. The error messages should be associated with their respective controls, so you may have a label or aria-describedby. In any case it's best you focus on the first control that needs attention.

## aria-invalid
If a particular field is invalid, yo ushould set aria-invalid="true" for the form control. This attribute causes screen readers to identify the control as being invalid or in need of attention.