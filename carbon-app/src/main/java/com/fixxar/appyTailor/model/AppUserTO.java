package com.fixxar.appyTailor.model;

import javax.persistence.Entity;

/**
 * id INTEGER PRIMARY KEY AUTOINCREMENT, gender int, dob datetime, name varchar(50), password varchar(20), address varchar(50), 
mobile varchar(20), company varchar(50), vechicle varchar(100), last_updated_date datetime
 * @author mnagappan
 *
 */
@Entity
public class AppUserTO {

	private int id;
	private int gender;
	private String dob;
	private String name;
	private String password;
	private String mobile;
	private String address;
	private String company;
	private String vechicle;
	private String lastUpdatedDate;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getGender() {
		return gender;
	}
	public void setGender(int gender) {
		this.gender = gender;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getVechicle() {
		return vechicle;
	}
	public void setVechicle(String vechicle) {
		this.vechicle = vechicle;
	}
	public String getLastUpdatedDate() {
		return lastUpdatedDate;
	}
	public void setLastUpdatedDate(String lastUpdatedDate) {
		this.lastUpdatedDate = lastUpdatedDate;
	}

}
