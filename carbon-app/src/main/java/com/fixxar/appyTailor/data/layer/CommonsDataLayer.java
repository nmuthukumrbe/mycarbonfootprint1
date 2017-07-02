package com.fixxar.appyTailor.data.layer;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


public class CommonsDataLayer
{

	private Log log = LogFactory.getLog(this.getClass());

	public CommonsDataLayer() {
	}

	public void close(AutoCloseable... closeables) {
		for (AutoCloseable closeable : closeables) {
			try {
				if (closeable != null)
					closeable.close();
			} catch (Exception e) {
				log.error("close operation failed" + e.getMessage());
			}
		}
	}

}
