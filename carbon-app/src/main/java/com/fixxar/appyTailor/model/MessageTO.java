package com.fixxar.appyTailor.model;

import javax.persistence.Entity;

/**
 * CREATE TABLE message(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id int, read int, message varchar(100), last_updated_date datetime);
 * 
 * @author mnagappan
 *
 */
@Entity
public class MessageTO {
	
	private int id;
	private int userId;
	private int read;
	private String message;
	private String updatedDate;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getRead() {
		return read;
	}
	public void setRead(int read) {
		this.read = read;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getUpdatedDate() {
		return updatedDate;
	}
	public void setUpdatedDate(String updatedDate) {
		this.updatedDate = updatedDate;
	}
	
}
