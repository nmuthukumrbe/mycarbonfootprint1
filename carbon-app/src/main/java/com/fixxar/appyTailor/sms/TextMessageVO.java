/**
 * 
 */
package com.fixxar.appyTailor.sms;

import com.google.i18n.phonenumbers.Phonenumber.PhoneNumber;

/**
 * @author apalaniswamy
 *
 */
public class TextMessageVO
{

	private String message;
	
	private PhoneNumber number;

	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public PhoneNumber getNumber() {
		return number;
	}

	public void setNumber(PhoneNumber number) {
		this.number = number;
	}
	
}
