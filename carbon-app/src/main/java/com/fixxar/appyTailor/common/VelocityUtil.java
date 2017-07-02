package com.fixxar.appyTailor.common;

import java.io.StringWriter;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.runtime.RuntimeConstants;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;

public class VelocityUtil
{

	// private Log log = LogFactory.getLog(this.getClass());

	private VelocityUtil() {
		Velocity.setProperty(RuntimeConstants.RESOURCE_LOADER, "classpath");
		Velocity.setProperty("classpath.resource.loader.class", ClasspathResourceLoader.class.getName());
		// Velocity.setProperty(RuntimeConstants.RESOURCE_LOADER, "file");
		// Velocity.setProperty("file.resource.loader.class", "org.apache.velocity.runtime.resource.loader.FileResourceLoader");
		// Velocity.addProperty("file.resource.loader.path", "G:/Project/repository/fixa/code/trunk/dental-app-core/src/main/resources/");
		Velocity.init();
	}

	private static VelocityUtil velocityUtil;

	public static VelocityUtil getInstance() {
		if (velocityUtil == null) {
			synchronized (VelocityUtil.class) {
				if (velocityUtil == null) {
					velocityUtil = new VelocityUtil();
				}
			}
		}
		return velocityUtil;
	}

	public String build(Map<String, Object> context, String templateName) {
		VelocityContext vContext = new VelocityContext();
		if (context != null && context.size() > 0) {
			for (Entry<String, Object> entrySet : context.entrySet()) {
				vContext.put(entrySet.getKey(), entrySet.getValue());
			}
		}
		return build(vContext, templateName);
	}

	private String build(VelocityContext context, String templateName) {
		StringWriter w = new StringWriter();
		Template template = Velocity.getTemplate(templateName);
		template.merge(context, w);
		return w.toString();
	}
}
