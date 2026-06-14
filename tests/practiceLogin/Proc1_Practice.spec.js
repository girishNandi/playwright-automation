import {test,expect} from '@playwright/test'
import{loginConfig} from '../../testConfig.js'
import {basePage,practicePage} from '../../src/locators/basePage.json'
import {loginPage} from '../../src/locators/loginPage.json'



test('01] Task : Login to Practice test AutomationPage ',async({page})=>{
// Step 01 : Navigate to URL and verify page is opened
    await page.goto(loginConfig.baseURL)
    await expect(page).toHaveURL(loginConfig.baseURL)

// Step 02 : Verify that Practice Hyperlink is clicked
    await page.click(basePage.practice)
    await expect(page).toHaveURL(loginConfig.practiceURL)

// Step 03 : Click on Test login page hyperlink
    await page.goto(loginConfig.practiceURL)
    await expect(page.locator(practicePage.testLogin)).toBeVisible()

// Step 04 : Click on Test Login page Hyperlink 
    
   await page.click(practicePage.testLogin)
   await expect(page.locator(loginPage.userName)).toBeVisible()

// Step 05 : Without Username click on Submit, observe the error message

  await page.click(loginPage.submitButton)
  await expect(page.locator(loginPage.error)).toHaveText("Your username is invalid!")

// Step 06 : Provide valid User name without password, click on Submit button
  
  await page.fill(loginPage.userName,loginConfig.userName)
  await page.click(loginPage.submitButton)
  await expect(page.locator(loginPage.error)).toHaveText("Your password is invalid!")

// Step 07 : Provide invalid Username without password, click on Submit button

  await page.fill(loginPage.userName,loginConfig.invalidUserName)
  await page.click(loginPage.submitButton)
  await expect(page.locator(loginPage.error)).toHaveText("Your username is invalid!")

// Step 08 : Provide vlid username and invalid password, click on submit button
  await page.fill(loginPage.userName,loginConfig.userName)
  await page.fill(loginPage.password,loginConfig.invalidPassword)
  await page.click(loginPage.submitButton)
  await expect(page.locator(loginPage.error)).toHaveText("Your password is invalid!")


// Step 09 : Provide valid User name and Password, Click on Submit button
  await page.fill(loginPage.userName,loginConfig.userName)
  await page.fill(loginPage.password,loginConfig.password)
  await page.click(loginPage.submitButton)

// Step 10 : Verify that Login is successful
  
 await expect(page.locator(loginPage.loggedInPage)).toHaveText("Logged In Successfully")

// Step 11 : Click on Logout button
  
  await page.click(loginPage.logOut)

// Step 12 : Verify Logout button is not displayed

  await expect(page.locator(loginPage.logOut)).not.toBeVisible()

// Step 13 : Click on Home button, verify that Login page is not displayed

  await page.click(basePage.home)
  await expect(page.locator(loginPage.userName)).not.toBeVisible()

// Close the browser
  
 await page.close();

})




