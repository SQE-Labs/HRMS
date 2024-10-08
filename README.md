## HRMS
## Cypress javascript based framework

# After cloning project, make sure to run "npm install"

1. **npx cypress open**   // To open the cypress and run
2. **npx cypress run**    // To run all the tests
3. **npx cypress run --spec "cypress/integration/your_test_file.cy.js" --browser chrome --headed --config video=false, screenshotOnRunFailure=false**  // Command with additional parameters

   ## multireport generation and merging
   #cypress.config.json
5.  reporter: 'cypress-multi-reporters',
     reporterOptions: {
        reporterEnabled: 'mochawesome',
         mochawesomeReporterOptions: {
             reportDir: 'cypress/reports/html',
             overwrite: false,
             html: false,
             json: true,
             charts: true,
             reportPageTitle: 'HRMS Running report',
             screenshots: true,
         },
     },

      #Package.josn
    6. "scripts": {
    "clean:reports": "mkdir -p cypress/reports && rm -R -f cypress/reports/* && mkdir cypress/reports/mochareports",
    "pretest": "npm run clean:reports",
    "scripts": "cypress run",
    "chrome:scripts": "cypress run --browser chrome ",
    "firefox:scripts": "cypress run --browser firefox ",
    "combine-reports": "mochawesome-merge 'C:/Users/lenovo/Desktop/HRMS/cypress/reports/html/mochawesome*.json' > 
     C:/Users/lenovo/Desktop/HRMS/cypress/reports/html/report.json",
    "generate-report": "marge cypress/reports/html/report.json -f report -o cypress/reports/html",
    "posttest": "npm run combine-reports && npm run generate-report",
    "test": "npm run scripts || npm run posttest",
    "chrome:test": "npm run pretest && npm run chrome:scripts || npm run posttest",
    "firefox:test": "npm run pretest && npm run firefox:scripts || npm run posttest"
  },
