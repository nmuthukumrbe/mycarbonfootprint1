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
import com.fixxar.appyTailor.model.TripTO;
import com.fixxar.appyTailor.model.TripUserTO;

/**
 * @Wiki http://docs.spring.io/spring-framework/docs/current/spring-framework-
 *       reference/html/jdbc.html
 * 
 * @author mnagappan
 *
 */
@Repository
public class TripUserDAO extends CommonsDataLayer {

	public String PROPERTY = "SELECT * FROM carbon_trip_user ORDER BY id DESC";

	private Log log = LogFactory.getLog(this.getClass());

	private JdbcTemplate jdbcTemplate;

	@Autowired
	private AppUserDAO appUserDAO;
	
	@Autowired
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	public List<TripUserTO> getAllTripUser(AppUserTO appUser) {
		List<TripUserTO> trip_userList = null;
		try {
			String query = "";			
			query = "select * from carbon_trip_user where 1=1 ";
			if(appUser.getId()>0){
				query += "and user_id="+appUser.getId();
			}
			query += " limit 50";
			trip_userList = this.jdbcTemplate.query(query,
					new RowMapper<TripUserTO>() {
						public TripUserTO mapRow(ResultSet rs, int rowNum)
								throws SQLException {
							return rsToTripUser(rs);
						}
					});
		} catch (Exception e) {
			log.error("Error in TripDAO:getAll Trip details", e);
		}
		return trip_userList;
	}

	public List<TripUserTO> getTripUserList(TripTO trip) {
		List<TripUserTO> trip_userList = null;
		try {
			String query = "SELECT * FROM carbon_trip_user p where 1=1 ";
			if (trip.getId() > 0) {
				query += " and trip_id=" + trip.getId();
			}
			trip_userList = this.jdbcTemplate.query(query,
			new RowMapper<TripUserTO>() {
				public TripUserTO mapRow(ResultSet rs, int rowNum)
						throws SQLException {
					return rsToTripUser(rs);
				}
			});
		} catch (Exception e) {
			log.error("Error in TripDAO: getTripUserList", e);
		}
		return trip_userList;
	}
	
	public TripUserTO getTripUser(TripTO trip) {
		TripUserTO tripUser = null;
		try {
			String query = "SELECT * FROM carbon_trip_user p where 1=1 ";
			if (trip.getId() > 0) {
				query += " and trip_id=" + trip.getId();
			}
			if (trip.getUserId() > 0) {
				query += " and user_id=" + trip.getUserId();
			}
			return this.jdbcTemplate.queryForObject(query,
			new RowMapper<TripUserTO>() {
				public TripUserTO mapRow(ResultSet rs, int rowNum)
						throws SQLException {
					return rsToTripUser(rs);
				}
			});
		} catch (Exception e) {
			log.error("Error in TripDAO: getTripUser", e);
		}
		return tripUser;
	}

	
	/**
	 * user_id int, trip_id int, st_from_lat varchar(50), st_from_long varchar(50), 
end_from_long varchar(50), end_from_long varchar(50), km_travel varchar(50), carbon_saving varchar(50), pay_for_ride varchar(50), updated_date datetime
	 * @param trip_user
	 * @return
	 */
	public int saveTripUser(final TripUserTO trip_user) {
		try {
			final int id = trip_user.getId();
			KeyHolder keyHolder = new GeneratedKeyHolder();
			this.jdbcTemplate.update(new PreparedStatementCreator() {
				public PreparedStatement createPreparedStatement(
						Connection connection) throws SQLException {
					PreparedStatement pst = null;
					if (id > 0) {
						pst = connection
								.prepareStatement(
										"update carbon_trip_user set user_id=?, trip_id=?, last_updated_date=?, st_from_lat=?, st_from_long=?, end_from_lat=?, end_from_long=?,"
										+ "km_travel=?,carbon_saving=?,pay_for_ride=?"
										+ " WHERE id=?",
										new String[] { "id" });
						pst.setInt(11, id);
					} else {
						pst = connection
								.prepareStatement(
										"INSERT INTO carbon_trip_user(user_id, trip_id, last_updated_date, st_from_lat, st_from_long, end_from_lat, end_from_long,km_travel,carbon_saving,pay_for_ride"
												+ ") VALUES(?,?,?,?,?,?,?,?,?,?)",
										new String[] { "id" });
					}
					pst.setInt(1, trip_user.getUserId());
					pst.setInt(2, trip_user.getTripId());	
					pst.setString(3, Utils.uiToDB(trip_user.getLastUpdatedDate()));
					pst.setString(4, trip_user.getStFromLat());
					pst.setString(5, trip_user.getStFromLong());
					pst.setString(6, trip_user.getEndToLat());
					pst.setString(7, trip_user.getEndToLong());
					pst.setString(8, trip_user.getKmTravel());
					pst.setString(9, trip_user.getCarbonSaving());
					pst.setInt(10, trip_user.getPayForRide());
					return pst;
				}
			}, keyHolder);
			
			if(keyHolder.getKey() != null){
				return keyHolder.getKey().intValue();
			} else if(id>0){
				return id;
			}
		} catch (Exception e) {
			log.error("Error in  TripDAO:getting saveTrip", e);
		}
		return 0;
	}

	/**
	 * 
	 * @param Trip
	 * @return
	 */
	public void deleteTripUser(TripUserTO trip_user) {
		try {
			this.jdbcTemplate.update("delete from carbon_trip_user where id = ?",trip_user.getId());
		} catch (Exception e) {
			log.error("Error in TripDAO:deleting details", e);
		}
	}
	
	/**
	 * CREATE TABLE trip_user(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id int, trip_id int, st_from_lat varchar(50), st_from_long varchar(50), 
end_from_lat varchar(50), end_from_long varchar(50), km_travel varchar(50), carbon_saving varchar(50), pay_for_ride varchar(50), last_updated_date datetime);
	 * @param rs
	 * @return
	 */
	public TripUserTO rsToTripUser(ResultSet rs) {
		TripUserTO trip_userTO = null;
		try {
			trip_userTO = new TripUserTO();
			trip_userTO.setId(rs.getInt("id"));
			trip_userTO.setUserId(rs.getInt("user_id"));
			AppUserTO userTO = new AppUserTO();
			userTO.setId(trip_userTO.getUserId());
			userTO = appUserDAO.getAppUser(userTO);
			trip_userTO.setUserTO(userTO);
			trip_userTO.setTripId(rs.getInt("trip_id"));
			trip_userTO.setStFromLat(rs.getString("st_from_lat"));
			trip_userTO.setStFromLong(rs.getString("st_from_long"));
			trip_userTO.setEndToLat(rs.getString("end_from_lat"));
			trip_userTO.setEndToLong(rs.getString("end_from_long"));
			trip_userTO.setKmTravel(rs.getString("km_travel"));
			trip_userTO.setCarbonSaving(rs.getString("carbon_saving"));
			trip_userTO.setPayForRide(rs.getInt("pay_for_ride"));
			trip_userTO.setLastUpdatedDate(Utils.dbToUI(rs.getString("last_updated_date")));			
		} catch (Exception e) {
			log.error("Error in TripDAO: rsToTrip", e);
		}
		return trip_userTO;
	}

}
