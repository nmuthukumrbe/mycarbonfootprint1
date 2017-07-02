
CREATE TABLE carbon_app_user(id INTEGER PRIMARY KEY AUTOINCREMENT, gender int, dob datetime, name varchar(50), password varchar(20), address varchar(50), 
mobile varchar(20), company varchar(50), vechicle varchar(100), last_updated_date datetime);

CREATE TABLE carbon_trip(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id int, name varchar(300), last_updated_date datetime, organizer int, 
from_lat varchar(50), from_long varchar(50), to_lat varchar(50), to_long varchar(50),km_travel varchar(50), carbon_saving varchar(50));

CREATE TABLE carbon_message(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id int, read int, message varchar(100), last_updated_date datetime);

CREATE TABLE carbon_trip_user(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id int, trip_id int, st_from_lat varchar(50), st_from_long varchar(50), 
end_from_lat varchar(50), end_from_long varchar(50), km_travel varchar(50), carbon_saving varchar(50), pay_for_ride varchar(50), last_updated_date datetime);

