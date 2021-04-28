const pg = require("pg");

const config = {
  host: "localhost",
  user: "postgres",
  password: "FaJ_761FA",
  database: "postgres",
  port: 5432,
  ssl: false,
};

const client = new pg.Client(config);

async function databaseRequest(response) {
  client.connect();
  var res = await client.query("SELECT * FROM Street");
  client.end();
  response.json({ res });
}

module.exports = { databaseRequest };

// Задания:
// 1. Вывести общее число жителей
("SELECT COUNT(*) FROM Person");
// 2. Вывести средний возраст жителей
("SELECT AVG(Age) AS Average_Age FROM Person");
// 3. Вывести отсортированный по алфавиту список фамилий без повторений
("SELECT DISTINCT lastname FROM Person ORDER BY lastname");
// 4. Вывести список фамилий, с указанием количества повторений этих фамилий в общем списке
("SELECT lastname, COUNT(*) AS lastnameCount FROM Person GROUP BY lastname");
// 5. Вывести фамилии, которые содержат в середине букву «б»
("SELECT lastname FROM Person WHERE lastname LIKE '_%б%_' GROUP BY lastname");
// 6. Вывести список «бомжей»
("SELECT * FROM Person WHERE Id_Street IS null");
// 7. Вывести список несовершеннолетних, проживающих на проспекте Правды
("SELECT * FROM Person INNER JOIN Street  ON Person.Id_Street = Street.Id And Age < 18 AND NAME like 'проспект Правды'");
// 8. Вывести упорядоченный по алфавиту список всех улиц с указанием, сколько
// жильцов живёт на улице
("SELECT Street.Id, Street.Name, COUNT(Person.Id) FROM Street JOIN Person ON  Street.Id = Person.Id_Street GROUP BY Street.Id, Street.Name");
// 9. Вывести список улиц, название которых состоит из 6-ти букв
("SELECT * FROM Street WHERE length(Name) = 6");
// 10. Вывести список улиц с количеством жильцов на них меньше 3.
("SELECT Street.Id, Street.Name FROM Street JOIN Person ON  Street.Id = Person.Id_Street GROUP BY Street.Id, Street.Name HAVING COUNT(*) < 3;");
