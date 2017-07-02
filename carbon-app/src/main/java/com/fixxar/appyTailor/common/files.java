/**
 * 
 */
package com.fixxar.appyTailor.common;

import java.util.Scanner;

/**
 * @author Muthu
 *
 */

class files {
	public static void main(String args[]) {

		int m1, m2, m3, m4, t, a;
		Scanner s = new Scanner(System.in);
		m1 = s.nextInt();
		m2 = s.nextInt();
		m3 = s.nextInt();
		m4 = s.nextInt();
		t = m1 + m2 + m3 + m4;
		a = t / 4;
		if (m1 >= 45) {
			System.out.println("mark1 is pass");

		} else {
			System.out.println("mark1 is fail");

		}

		if (m2 >= 45) {
			System.out.println("mark2 is pass");

		} else {
			System.out.println("mark2 is fail");

		}
		if (m3 >= 45) {
			System.out.println("mark3 is pass");

		} else {
			System.out.println("mark3 is fail");

		}

		if (m4 >= 45) {
			System.out.println("mark4 is pass");

		} else {
			System.out.println("mark4 is fail");

		}
	}
}
