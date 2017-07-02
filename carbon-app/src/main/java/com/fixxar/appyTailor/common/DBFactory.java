package com.fixxar.appyTailor.common;

import java.sql.Connection;

import javax.sql.DataSource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class DBFactory
{

/*	@Autowired
	AppConfig appConfig;*/ 
	
	@Autowired
	@Qualifier("dbDataSource")
	private DataSource dataSource;

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	
	private Connection con;

	private Log log = LogFactory.getLog(this.getClass());

	public void initialize(boolean create) throws Exception {
		try {
			
			log.info("Trying to get Connection from datasource");
			if(dataSource != null && con == null){
				con = dataSource.getConnection();
				log.info("Auto commit is:" + con.getAutoCommit());
				log.info("Connection retrived successfully");
			}
			
		} catch (Exception e) {
			log.error("Unable to get connection", e);
			throw e;
		}
	}

	public Connection getConnection() {
		return con;
	}

}
