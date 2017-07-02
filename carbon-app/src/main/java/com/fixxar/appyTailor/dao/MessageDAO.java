package com.fixxar.appyTailor.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import javax.sql.DataSource;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import com.fixxar.appyTailor.common.Utils;
import com.fixxar.appyTailor.data.layer.CommonsDataLayer;
import com.fixxar.appyTailor.model.AppUserTO;
import com.fixxar.appyTailor.model.MessageTO;

/**
 * @Wiki http://docs.spring.io/spring-framework/docs/current/spring-framework-
 *       reference/html/jdbc.html
 * 
 * @author mnagappan
 *
 */
@Repository
public class MessageDAO extends CommonsDataLayer {

	public String PROPERTY = "SELECT * FROM carbon_message ORDER BY id DESC";

	private Log log = LogFactory.getLog(this.getClass());

	private JdbcTemplate jdbcTemplate;

	@Autowired
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	public List<MessageTO> getAllMessage(MessageTO messageTO,
			AppUserTO appUser, int read) {
		List<MessageTO> messageList = null;
		try {
			String query = "";			
			query = "select * from carbon_message where 1=1 ";// where
															// date(created_date)
															// = date('now','-1
															// day')
			if(read>0){
				query += " and read=1 ";
			}
			query += " limit 50";
			messageList = this.jdbcTemplate.query(query,
					new RowMapper<MessageTO>() {
						public MessageTO mapRow(ResultSet rs, int rowNum)
								throws SQLException {
							return rsToMessage(rs);
						}
					});
		} catch (Exception e) {
			log.error("Error in MessageDAO:getAll Message details", e);
		}
		return messageList;
	}

	public MessageTO getMessage(MessageTO Message) {
		try {
			String query = "SELECT * FROM carbon_message p where 1=1 ";
			if (Message.getId() > 0) {
				query += " and id=" + Message.getId();
			}
			return this.jdbcTemplate.queryForObject(query,
					new RowMapper<MessageTO>() {
						public MessageTO mapRow(ResultSet rs, int rowNum)
								throws SQLException {
							return rsToMessage(rs);
						}
					});
		} catch (Exception e) {
			log.error("Error in MessageDAO: getMessage", e);
		}
		return null;
	}

	/**
user_id int, read int, carbon_message varchar(100), last_updated_date
	 * @param message
	 * @return
	 */
	public int saveMessage(final MessageTO message) {
		try {
			final int id = message.getId();
			KeyHolder keyHolder = new GeneratedKeyHolder();
			this.jdbcTemplate.update(new PreparedStatementCreator() {
				public PreparedStatement createPreparedStatement(
						Connection connection) throws SQLException {
					PreparedStatement pst = null;
					if (id > 0) {
						pst = connection
								.prepareStatement(
										"update carbon_message set user_id=?, readed=?, message=?, last_updated_date=?"
										+ " WHERE id=?",
										new String[] { "id" });
						pst.setInt(11, id);
					} else {
						pst = connection
								.prepareStatement(
										"INSERT INTO carbon_message(user_id, readed, message, last_updated_date"
												+ ") VALUES(?,?,?,?)",
										new String[] { "id" });
					}
					pst.setInt(1, message.getUserId());
					pst.setInt(2, message.getRead());	
					pst.setString(3, message.getMessage());
					pst.setString(4, Utils.uiToDB(message.getUpdatedDate()));
					return pst;
				}
			}, keyHolder);
			
			if(keyHolder.getKey() != null){
				return keyHolder.getKey().intValue();
			} else if(id>0){
				return id;
			}
		} catch (Exception e) {
			log.error("Error in  MessageDAO:getting saveMessage", e);
		}
		return 0;
	}

	/**
	 * 
	 * @param Message
	 * @return
	 */
	public void deleteMessage(MessageTO message) {
		try {
			this.jdbcTemplate.update("delete from carbon_message where id = ?",message.getId());
		} catch (Exception e) {
			log.error("Error in MessageDAO:deleting details", e);
		}
	}
	
	/**
	 * CREATE TABLE message(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id int, message_id int, st_from_lat varchar(50), st_from_long varchar(50), 
end_from_lat varchar(50), end_from_long varchar(50), km_travel varchar(50), carbon_saving varchar(50), pay_for_ride varchar(50), last_updated_date datetime);
	 * @param rs
	 * @return
	 */
	public MessageTO rsToMessage(ResultSet rs) {
		MessageTO messageTO = null;
		try {
			messageTO = new MessageTO();
			messageTO.setId(rs.getInt("id"));
			messageTO.setUserId(rs.getInt("user_id"));
			messageTO.setRead(rs.getInt("readed"));
			messageTO.setMessage(rs.getString("message"));
		} catch (Exception e) {
			log.error("Error in MessageDAO: rsToMessage", e);
		}
		return messageTO;
	}

}
