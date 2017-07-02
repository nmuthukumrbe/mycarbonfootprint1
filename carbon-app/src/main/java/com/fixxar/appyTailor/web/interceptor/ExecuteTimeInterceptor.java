/**
 * 
 */
package com.fixxar.appyTailor.web.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.fixxar.appyTailor.session.ApplicationUser;


/**
 * @author Muthu
 *
 */
public class ExecuteTimeInterceptor extends HandlerInterceptorAdapter{

	/**
	 *   This method handles all the request before executing (redirecting to corresponding servlet)
	 */
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)throws Exception{
		
		long startTime = System.currentTimeMillis();
		request.setAttribute("startTime", startTime);
		//System.out.println("method : " + request.getMethod());
		if(!request.getRequestURI().contains("/") && !request.getRequestURI().contains("/t/") && !request.getRequestURI().contains("/c/") 
				&& !request.getRequestURI().contains("/about/")
				&& !request.getRequestURI().contains("/logout1")
				&& !request.getRequestURI().contains("/logout2")
				&& !request.getRequestURI().contains("/contact/")
				&& !request.getRequestURI().contains("/products/")
				&& !request.getRequestURI().contains("/story/")
				&& !request.getRequestURI().contains("/login") && 
				!request.getRequestURI().contains("/resources/") && !request.getRequestURI().contains("/appyTailor/resources/")
				&& !request.getRequestURI().contains("/company") ){
			ApplicationUser appUser = RequestUtil.getUserFromSession(request);
			if(appUser == null || appUser != null && appUser.getAppUserTO()==null){
				return false;
			}
			/*if(!request.getHeader("authorization").equals(appUser.getSessionKey())){
				response.setStatus(307); //this makes the redirection keep your requesting method as is.
				response.addHeader("Location", request.getContextPath() + "/logout");
				RequestDispatcher rd=request.getRequestDispatcher(request.getContextPath() + "/logout");
				rd.forward(request, response);
				response.setHeader("action", "logout");
				return false;
			}*/
		}
		return true;
	}

	/**
	 *   This method handles all the request completing of request and before sending the response to the caller
	 */
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, 
			ModelAndView modelAndView) throws Exception{
		
		long startTime = 0l, endTime = 0l, executionTime = 0l;
		
		if(request.getAttribute("startTime") != null){
			startTime = (Long)request.getAttribute("startTime");
		}
		 
		endTime = System.currentTimeMillis();
		
		executionTime = endTime - startTime;
		
		System.out.println("executionTime="+executionTime);
		//Modifies the existing modelAndView
		if(modelAndView!=null){
			//modelAndView.addObject("executionTime", executionTime);
		}
		
		//System.out.println("[" + (((HandlerMethod)handler).getBean()).getClass().getName() + "(" + 
		//((HandlerMethod)handler).getMethod().getName() + ")] executionTime: " + executionTime + "ms" );
		
	}
}
