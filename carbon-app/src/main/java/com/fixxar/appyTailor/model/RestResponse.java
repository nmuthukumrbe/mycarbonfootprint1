/**
 * 
 */
package com.fixxar.appyTailor.model;


/**
 * @author Muthu
 *
 */
public class RestResponse {

	private Object object;
	private String ackType;
	private String message;
	
	public String getAckType() {
		return ackType;
	}
	public void setAckType(String ackType) {
		this.ackType = ackType;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Object getObject() {
		return object;
	}
	public void setObject(Object object) {
		this.object = object;
	}
	
}
