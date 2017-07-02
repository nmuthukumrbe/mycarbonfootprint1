/**
 * 
 */
package com.fixxar.appyTailor.model;


/**
 * @author Muthu
 *
 */
public enum UserTypeEnum {

	ADMIN(1, "ADMIN"),
	VIRTUAL_CLIENT(2, "VIRTUAL CLIENT"),
	AGENT(3, "AGENT"),	
	TAILOR(4, "TAILOR"),
	SUPER_ADMIN(5, "SUPER ADMIN");
	
	private String type;
	private int id;
	
	UserTypeEnum(int id, String type){
		this.setType(type);
		this.setId(id);
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public static UserTypeEnum getOrderStatus(int id){
		for(UserTypeEnum userTypeEnum :UserTypeEnum.values()){
			if(userTypeEnum.getId() == id){
				return userTypeEnum;
			}
		}
		return null;
	}

}
