const Configuration = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'body-case': [0, 'always'],
      'body-full-stop': [0, 'always'],
      'body-empty': [0, 'always'],
      'footer-empty': [0, 'always'],
      'scope-case': [0, 'always'],
      'subject-case': [0, 'always'],
      'subject-case-factory': [1, 'always'],
      'subject-jira-ticket': [1, 'always'],
    },
    plugins: [
      {
        rules: {
          'subject-case-factory': ({ subject }) => {
            return [
              subject?.match(/^(?:\[.*] )?[A-Z]/),
              `Your subject summary should be 'Sentence case' (ie. start with an uppercase letter).`,
            ]
          },
          'subject-jira-ticket': ({ subject }) => {
            return [
              subject?.match(/\[\w+-\d+] /),
              `Your subject should start with the JIRA ticket enclosed in square brackets (ex. [PLAT2-311] ).`,
            ]
          },
        },
      },
    ],
  }
   
  export default Configuration