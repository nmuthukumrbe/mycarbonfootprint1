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
import com.fixxar.appyTailor.model.AppUserTO;
import com.fixxar.appyTailor.model.UserTypeEnum;

/**
 * id INTEGER PRIMARY KEY AUTOINCREMENT, gender int, dob datetime, name varchar(50), password varchar(20), address varchar(50), 
mobile varchar(20), company varchar(50), vechicle varchar(100), last_updated_date datetime
 * @author mnagappan
 *
 */
@Repository
public class AppUserDAO {

	private Log log = LogFactory.getLog(this.getClass());

	private JdbcTemplate jdbcTemplate;

	@Autowired
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	public int save(final AppUserTO appUserTO) {
		try {
			KeyHolder keyHolder = new GeneratedKeyHolder();
			this.jdbcTemplate.update(new PreparedStatementCreator() {
				public PreparedStatement createPreparedStatement(
						Connection connection) throws SQLException {
					PreparedStatement pst = null;
					if (appUserTO.getId() > 0) {
						pst = connection
								.prepareStatement(
										"Update carbon_app_user set gender=?, dob=?, name=?, password=?, address=?, mobile=?,company=?,vechicle=?,last_updated_date=? where id = ? ",
										new String[] { "id" });
						pst.setInt(10, appUserTO.getId());
					} else {
						pst = connection
								.prepareStatement(
										"insert into carbon_app_user(gender, dob, name, password, address, mobile, company,vechicle, last_updated_date) values (?,?,?,?,?,?,?,?,?)",
										new String[] { "id" });
					}
					pst.setInt(1, appUserTO.getGender());
					pst.setString(2, Utils.uiToDB(appUserTO.getDob()));
					pst.setString(3, appUserTO.getName());
					pst.setString(4, appUserTO.getPassword());
					pst.setString(5, appUserTO.getAddress());
					pst.setString(6, appUserTO.getMobile());
					pst.setString(7, appUserTO.getCompany());
					pst.setString(8, appUserTO.getVechicle());
					pst.setString(9, Utils.uiToDB(appUserTO.getLastUpdatedDate()));
					return pst;
				}
			}, keyHolder);
			
			if(keyHolder.getKey() != null){
				return keyHolder.getKey().intValue();
			} else if(appUserTO.getId()>0){
				return appUserTO.getId();
			}
		} catch (Exception e) {
			log.error("Error in AppUserDAO: getting save AppUser", e);
		}
		return 0;
	}

	public int updateCompanyId(int id) {
		try {

			String query = "Update carbon_app_user set cmp_id=? where id = ? ";
			return this.jdbcTemplate.queryForObject(query, Integer.class, id);

		} catch (Exception e) {
			log.error("Error in AppUserDAO: UpdateVC", e);
		}
		return id;
	}

	public int updateVCId(int id) {

		try {

			String query = "Update carbon_app_user set vc_id=? where id = ? ";
			return this.jdbcTemplate.queryForObject(query, Integer.class, id);

		} catch (Exception e) {
			log.error("Error in AppUserDAO: UpdateVC", e);
		}
		return id;
	}

	/**
	 * This method is used to return appUser for the given appUserId
	 * 
	 * @param appUser
	 * @return AppUserTO
	 */
	public AppUserTO getAppUser(AppUserTO appUser) {
		AppUserTO appUserTO = null;
		try {
			String query = "select * from carbon_app_user where 1=1";
			if (appUser.getId() > 0) {
				query += " and id=" + appUser.getId();
			}
			if (StringUtils.isNotEmpty(appUser.getName())) {
				query += " and name='" + appUser.getName() + "'";
			}
			if (StringUtils.isNotEmpty(appUser.getPassword())) {
				query += " and password='" + appUser.getPassword() + "'";
			}

			return this.jdbcTemplate.queryForObject(query,
					new RowMapper<AppUserTO>() {
						public AppUserTO mapRow(ResultSet rs, int rowNum)
								throws SQLException {
							return rsToAppUser(rs);
						}
					});
		} catch (Exception e) {
			log.error("Error in AppUserDAO:getAppUser", e);
		}
		return appUserTO;
	}

	public AppUserTO getUser(AppUserTO appUser) {
		AppUserTO appUserTO = null;
		try {
			String query = "select * from carbon_app_user where 1=1";
			if (StringUtils.isNotEmpty(appUser.getMobile())) {
				query += " and mobile='" + appUser.getMobile() + "'";
			}
			if (appUser.getId() > 0) {
				query += " and id='" + appUser.getId() + "'";
			}
			return this.jdbcTemplate.queryForObject(query,
					new RowMapper<AppUserTO>() {
						public AppUserTO mapRow(ResultSet rs, int rowNum)
								throws SQLException {
							return rsToAppUser(rs);
						}
					});
		} catch (Exception e) {
			log.error("Error in AppUserDAO:getAppUser", e);
		}
		return appUserTO;
	}

	public List<AppUserTO> getAllAppUsers(AppUserTO appUserTO) {
		List<AppUserTO> appUserList = null;
		try {
			if (appUserTO == null) {
				return appUserList;
			}
			String query = "Select * from carbon_app_user where 1=1";
			query += " and role not in (1,2)";
			appUserList = this.jdbcTemplate.query(query,
					new RowMapper<AppUserTO>() {
						public AppUserTO mapRow(ResultSet rs, int rowNum)
								throws SQLException {
							return rsToAppUser(rs);
						}
					});

		} catch (Exception e) {
			log.error("Error in AppUserDAO: getAllAppUsers", e);
		}
		return appUserList;
	}

	/**
	 * This method is used to delete given appUser
	 * 
	 * @param appUser
	 */
	public void deleteAppUser(AppUserTO appUser) {
		try {
			this.jdbcTemplate.update("delete from carbon_app_user where id=?",
					appUser.getId());
		} catch (Exception e) {
			log.error("Error in AppUserDAO: deleteAppUser", e);
		}
	}

	public List<AppUserTO> getAllTailor(AppUserTO appUserTO) {
		List<AppUserTO> appUserList = null;
		try {
			if (appUserTO == null) {
				return appUserList;
			}
			String query = "Select * from carbon_app_user where 1=1";
			query += " and role=" + UserTypeEnum.TAILOR.getId();
			appUserList = this.jdbcTemplate.query(query,
					new RowMapper<AppUserTO>() {
						public AppUserTO mapRow(ResultSet rs, int rowNum)
								throws SQLException {
							return rsToAppUser(rs);
						}
					});
		} catch (Exception e) {
			log.error("Error in AppUserDAO: getAllAppUsers", e);
		}
		return appUserList;
	}

	public AppUserTO getAppUserById(AppUserTO appUser) {
		AppUserTO appUserTO = null;
		try {
			String query = "select * from carbon_app_user where 1=1";
			query += " and id=" + appUser.getId();
			return this.jdbcTemplate.queryForObject(query,
					new RowMapper<AppUserTO>() {
						public AppUserTO mapRow(ResultSet rs, int rowNum)
								throws SQLException {
							return rsToAppUser(rs);
						}
					});
		} catch (Exception e) {
			log.error("Error in AppUserDAO:getAppUser", e);
		}
		return appUserTO;
	}

	public AppUserTO rsToAppUser(ResultSet rs) {
		AppUserTO appUserTO = null;
		try {
			appUserTO = new AppUserTO();
			appUserTO.setId(rs.getInt("id"));
			appUserTO.setName(rs.getString("name"));
			appUserTO.setPassword(rs.getString("password"));
			appUserTO.setMobile(rs.getString("mobile"));
			appUserTO.setVechicle(rs.getString("vechicle"));
			appUserTO.setCompany(rs.getString("company"));
			appUserTO.setDob(Utils.dbToUI(rs.getString("dob")));
			appUserTO.setAddress(rs.getString("address"));
			appUserTO.setGender(rs.getInt("gender"));
			appUserTO.setLastUpdatedDate(Utils.dbToUI(rs.getString("last_updated_date")));
		} catch (Exception e) {
			log.error("Error in CustomerDAO: rsToCustomer", e);
		}
		return appUserTO;
	}
}
