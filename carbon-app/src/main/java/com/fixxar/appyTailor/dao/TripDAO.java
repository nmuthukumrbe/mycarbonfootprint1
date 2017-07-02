package com.fixxar.appyTailor.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.apache.commons.lang3.StringUtils;
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

/**
 * @Wiki http://docs.spring.io/spring-framework/docs/current/spring-framework-
 *       reference/html/jdbc.html
 * 
 * @author mnagappan
 *
 */
@Repository
public class TripDAO extends CommonsDataLayer {

	public String PROPERTY = "SELECT * FROM carbon_trip ORDER BY id DESC";

	private Log log = LogFactory.getLog(this.getClass());

	private JdbcTemplate jdbcTemplate;

	@Autowired
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	public List<TripTO> getAllTrip(TripTO tripTO,
			AppUserTO appUser) {
		List<TripTO> tripList = null;
		try {
			String query = "";
			if (tripTO != null && StringUtils.isNotEmpty(tripTO.getName())) {
				query += "SELECT * FROM carbon_trip where 1=1";
				if (tripTO != null && StringUtils.isNotEmpty(tripTO.getName())) {
					query += " and name like '%" + tripTO.getName() + "%'";
				}
			} else {
				query = "select * from carbon_trip where 1=1 ";// where
															// date(created_date)
															// = date('now','-1
															// day')
			}
			query += " limit 50";
			tripList = this.jdbcTemplate.query(query,
					new RowMapper<TripTO>() {
						public TripTO mapRow(ResultSet rs, int rowNum)
								throws SQLException {
							return rsToTrip(rs);
						}
					});
		} catch (Exception e) {
			log.error("Error in TripDAO:getAll Trip details", e);
		}
		return tripList;
	}

	public TripTO getTrip(TripTO Trip) {
		try {
			String query = "SELECT * FROM carbon_trip p where 1=1 ";
			if (Trip.getId() > 0) {
				query += " and id=" + Trip.getId();
			}
			if (Trip.getUserId() > 0) {
				query += " and user_id=" + Trip.getUserId();
			}
			return this.jdbcTemplate.queryForObject(query,
					new RowMapper<TripTO>() {
						public TripTO mapRow(ResultSet rs, int rowNum)
								throws SQLException {
							return rsToTrip(rs);
						}
					});
		} catch (Exception e) {
			log.error("Error in TripDAO: getTrip", e);
		}
		return null;
	}

	public TripTO getActiveTrip(TripTO Trip) {
		try {
			String query = "SELECT * FROM carbon_trip p where 1=1 ";
			if (Trip.getId() > 0) {
				query += " and id=" + Trip.getId();
			}
			if (Trip.getUserId() > 0) {
				query += " and user_id=" + Trip.getUserId();
			}
			query += " and status in (0,1)  order by id desc limit 1 ";
			return this.jdbcTemplate.queryForObject(query,
					new RowMapper<TripTO>() {
						public TripTO mapRow(ResultSet rs, int rowNum)
								throws SQLException {
							return rsToTrip(rs);
						}
					});
		} catch (Exception e) {
			log.error("Error in TripDAO: getActiveTrip", e);
		}
		return null;
	}
	
	public int saveTrip(final TripTO trip) {
		try {
			final int id = trip.getId();
			KeyHolder keyHolder = new GeneratedKeyHolder();
			this.jdbcTemplate.update(new PreparedStatementCreator() {
				public PreparedStatement createPreparedStatement(
						Connection connection) throws SQLException {
					PreparedStatement pst = null;
					if (id > 0) {
						pst = connection
								.prepareStatement(
										"update carbon_trip set user_id=?, name=?, last_updated_date=?, organizer=?,from_lat=?,from_long=?, to_lat =?, to_long=?,km_travel=?,"
										+ "carbon_saving=?,status=? WHERE id=?",
										new String[] { "id" });
						pst.setInt(12, id);
					} else {
						pst = connection
								.prepareStatement(
										"INSERT INTO carbon_trip(user_id, name, last_updated_date, organizer, from_lat, from_long, to_lat, to_long, km_travel,carbon_saving,status"
												+ ") VALUES(?,?,?,?,?,?,?,?,?,?,?)",
										new String[] { "id" });
					}
					pst.setInt(1, trip.getUserId());
					pst.setString(2, trip.getName());
					pst.setString(3, Utils.uiToDB(trip.getLastUpdatedDate()));
					pst.setInt(4, trip.getOrganizer());
					pst.setString(5, trip.getFromLat());
					pst.setString(6, trip.getFromLong());
					pst.setString(7, trip.getToLat());
					pst.setString(8, trip.getToLong());
					pst.setString(9, trip.getKmTravel());
					pst.setString(10, trip.getCarbonSaving());
					pst.setInt(11, trip.getStatus());
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
	public void deleteTrip(TripTO trip) {
		try {
			this.jdbcTemplate.update("delete from carbon_trip where id = ?",trip.getId());
		} catch (Exception e) {
			log.error("Error in TripDAO:deleting details", e);
		}
	}

	public TripTO rsToTrip(ResultSet rs) {
		TripTO tripTO = null;
		try {
			tripTO = new TripTO();
			tripTO.setId(rs.getInt("id"));
			tripTO.setName(rs.getString("name"));
			tripTO.setLastUpdatedDate(rs.getString("last_updated_date"));
			tripTO.setOrganizer(rs.getInt("organizer"));
			tripTO.setFromLat(rs.getString("from_lat"));
			tripTO.setFromLong(rs.getString("from_long"));
			tripTO.setToLat(rs.getString("to_lat"));
			tripTO.setUserId(rs.getInt("user_id"));
			tripTO.setToLong(rs.getString("to_long"));
			tripTO.setKmTravel(rs.getString("km_travel"));
			tripTO.setCarbonSaving(rs.getString("carbon_saving"));
			tripTO.setStatus(rs.getInt("status"));
		} catch (Exception e) {
			log.error("Error in TripDAO: rsToTrip", e);
		}
		return tripTO;
	}

	public TripTO getTripByTripUser(TripTO trip) {
		try {
			String query = "select * from carbon_trip where status in (0,1) and id in ";
			if (trip.getUserId() > 0) {
				query += " (SELECT trip_id FROM carbon_trip_user p where 1=1 and user_id=" + trip.getUserId();
			}
			query += ") order by id desc";
			return this.jdbcTemplate.queryForObject(query,
			new RowMapper<TripTO>() {
				public TripTO mapRow(ResultSet rs, int rowNum)
						throws SQLException {
					return rsToTrip(rs);
				}
			});
		} catch (Exception e) {
			log.error("Error in TripDAO: getTripUser", e);
		}
		return null;
	}
}
