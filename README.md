# FinanceApp
www.morrisfinance.net -
This is a personal project I worked on to familiarize myself with MEAN stack. The user is able to login after registering a username. They then have access to a retirement calculator to map out their retirement goal and a budgeting section for adding income and expenses.
![image](https://user-images.githubusercontent.com/35941685/164115675-bfff9f15-d140-4e9f-8df2-a8d82b363895.png)

I have separated the frontend and backend into two projects and hosted on different urls using Heroku.
To run locally, you will need the api project and frontend project running:
</br>
</br>
In Frontend project(app):
```sh
$ ng serve
```
In api project (api):
```sh
$ node server.js
```

</br>
The backend is a REST API running on Express.js and uses JWT for authentication.
</br>
</br>

The frontend is running on Angular 10 with Material Design and ngx-echarts for UI
</br>
</br>
A Mongo Atlas DB is used for storing users and their data.
