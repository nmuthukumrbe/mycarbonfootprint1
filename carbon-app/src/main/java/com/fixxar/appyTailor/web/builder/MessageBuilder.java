/**
 * 
 */
package com.fixxar.appyTailor.web.builder;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.fixxar.appyTailor.common.Utils;
import com.fixxar.appyTailor.common.VelocityUtil;
import com.fixxar.appyTailor.dao.MessageDAO;
import com.fixxar.appyTailor.model.AppUserTO;
import com.fixxar.appyTailor.model.MessageTO;
import com.fixxar.appyTailor.web.interceptor.RequestUtil;

/**
 * @author Muthu
 *
 */
@Component
@Transactional
public class MessageBuilder {

	private Log log = LogFactory.getLog(this.getClass());
	
	@Autowired
	private HttpServletRequest context;
	
	@Autowired
	MessageDAO messageDAO;
	
	/**	
	 * 
	 * @return
	 */
	public String getAllMessage(MessageTO messageTO){
		
		AppUserTO appUserTO = RequestUtil.getUserFromSession(context).getAppUserTO();
		Map<String, Object> context = new HashMap<String, Object>();
		context.put("messageTO", messageTO);
		return VelocityUtil.getInstance().build(context, "message/manage-message.html");
	}
	
	/**	
	 * 
	 * @return
	 */
	public String getUnreadMessage(MessageTO messageTO){
		
		AppUserTO appUserTO = RequestUtil.getUserFromSession(context).getAppUserTO();
		
		List<MessageTO> messageList = messageDAO.getAllMessage(messageTO, appUserTO,1);
		Map<String, Object> context = new HashMap<String, Object>();
		context.put("messageList", messageList);
		context.put("messageTO", messageTO);
		return VelocityUtil.getInstance().build(context, "message/message-pagination.html");
	}
	
	public String getReadMessage(MessageTO messageTO){
		
		AppUserTO appUserTO = RequestUtil.getUserFromSession(context).getAppUserTO();
		List<MessageTO> messageList = messageDAO.getAllMessage(messageTO, appUserTO,2);
		Map<String, Object> context = new HashMap<String, Object>();
		context.put("messageList", messageList);
		context.put("messageTO", messageTO);
		return VelocityUtil.getInstance().build(context, "message/message-pagination.html");
	}

	/**
	 * 
	 * @param messageTO
	 * @return
	 */
	public int saveMessage(MessageTO messageTO){
		try{
			AppUserTO appUserTO = RequestUtil.getUserFromSession(context).getAppUserTO();
			if(messageTO.getId() > 0 ){
				return messageDAO.saveMessage(messageTO);
			} else {
				return messageDAO.saveMessage(messageTO);
			}
		} catch(Exception e){
			log.error("Error in MessageBuilder:saveMessage", e);
		}
		return 0;
	}
	
	/**
	 * 
	 * @param messageTO
	 * @return
	 */
	public String addEditMessage(MessageTO messageTO, boolean isFromOrder){
		Map<String, Object> context = new HashMap<String, Object>();
		if(messageTO!=null & messageTO.getId()>0){
			messageTO = messageDAO.getMessage(messageTO);
			context.put("message", messageTO);
		}
		if(isFromOrder){
			context.put("order", true);
		} else {
			context.put("order", false);
		}
		return VelocityUtil.getInstance().build(context, "message/add-message.html");
	}
	
	public String addEditMessageImage(MessageTO messageTO){
		Map<String, Object> context = new HashMap<String, Object>();
		if(messageTO!=null & messageTO.getId()>0){
			messageTO = messageDAO.getMessage(messageTO);
			context.put("message", messageTO);
		}
		return VelocityUtil.getInstance().build(context, "message/add-cust-image.html");
	}
	
	/**
	 * 
	 * @param messageTO
	 */
	public boolean deleteMessage(MessageTO messageTO){
		messageDAO.deleteMessage(messageTO);
		return true;
	}
	
	/**
	 * 
	 * @param messageTO
	 * @return
	 */
	public String messageDetails(MessageTO messageTO){
		AppUserTO appUserTO = RequestUtil.getUserFromSession(context).getAppUserTO();   // 1st
		Map<String, Object> context = new HashMap<String, Object>();
		messageTO = messageDAO.getMessage(messageTO);    //2nd
		if(messageTO != null & messageTO.getId() > 0){
			context.put("message", messageTO); //4 
		}
		return VelocityUtil.getInstance().build(context, "message/message-details.html");
	}
	
	/**
	 * 
	 * @param message
	 * @return
	 */
	public MessageTO getMessage(MessageTO message) {
		return messageDAO.getMessage(message);
	}
	
}
