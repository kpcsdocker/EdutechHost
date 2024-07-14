// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  studentUrl: 'http://localhost:8088/student',
  apiUrl: 'http://localhost:8088/api',
  mongoUrl: 'http://localhost:8088/mongo',
  postgresUrl: 'http://localhost:8088/postgres',
  authUrl: 'http://localhost:8088/auth',
  authMongoUrl: 'http://localhost:8088/auth/mongo',
  oauth2Url: 'http://localhost/oauth2/authorization/google',
  questions: 'http://localhost:8088/questions',
  chatbot: 'http://localhost:8088/api/send-message'
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
