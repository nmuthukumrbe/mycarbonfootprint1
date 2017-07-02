/**
 * 
 */
package com.fixxar.appyTailor.session;

import java.util.HashMap;
import java.util.Map;

import com.fixxar.appyTailor.model.AppUserTO;

/**
 * @author Samy
 *
 */
public class ApplicationUser
{

	private int userType;
	
	private int languageId;

	private boolean isAuthenticated;

	private String sessionKey;

	private Map<String, Object> cache;

	private AppUserTO appUserTO;
	
	public int getUserType() {
		return userType;
	}

	public void setUserType(int userType) {
		this.userType = userType;
	}

	public boolean isAuthenticated() {
		return isAuthenticated;
	}

	public void setAuthenticated(boolean isAuthenticated) {
		this.isAuthenticated = isAuthenticated;
	}

	public String getSessionKey() {
		return sessionKey;
	}

	public void setSessionKey(String sessionKey) {
		this.sessionKey = sessionKey;
	}

	public Object getCacheValue(String key) {
		if (cache != null && cache.containsKey(key)) {
			return cache.get(key);
		}
		return null;
	}

	public void setCacheValue(String key, Object value) {
		if (cache == null) {
			cache = new HashMap<String, Object>();
		}
		cache.put(key, value);
	}

	public int getLanguageId() {
		return languageId;
	}

	public void setLanguageId(int languageId) {
		this.languageId = languageId;
	}

	public AppUserTO getAppUserTO() {
		return appUserTO;
	}

	public void setAppUserTO(AppUserTO appUserTO) {
		this.appUserTO = appUserTO;
	}

}
