/*
 * First thing we have to do is import the I/O library.
 * The import statement tells us that we are going to be using a certain part of the API.
 * java.io is the package we are importing, it contains all the IO classes.
 * .* means that we are importing all the classes in the package.
 */
import java.io.*;


/**
 * A simple utility class for reading in data from the keyboard.
 * This class provides static methods for reading in Strings and numbers from the keyboard,
 * This will come in really handy because there is no real easy way to read from the
 * keyboard in java. Unlike c++ which has cin, java's strong object oriented design makes
 * things a little bit more complicated for beginners.
 *
 * @author Michael Marner (michael.the.drummer@gmail.com)
 */
public abstract class Keyboard {
	
	/**
	 * The BufferedReader class allows us to read data from an InputStream by lines.
	 * InputStreamReader is a class that allows us to read characters from an InputStream
	 * System.in is the system's InputStream, usually it is the keyboard.
	 */
	private static BufferedReader kbd = new BufferedReader(new InputStreamReader(System.in));
	
	
	/**
	 * This method reads a line from the keyboard.
	 *
	 * @return A string containing a line of text from the keyboard
	 */
	public static String readLine() {
		
		//String s is the String we will return
		String s=null;
		
		// Because reading from InputStreams can cause errors, we need to place our code inside the try block
		try{
			//This is the line that actually reads from the keyboard.
			s=kbd.readLine(); 
			
			//This line trims any white space from the string
			s=s.trim();
		}
		
		// Catch any Exception that occurred and print out an error message.
		catch(Exception e) {
			System.out.println(e);
		}
		
		//Return the string
		return s;
	}
	
	
	/**
	 * This method reads an int from the keyboard.
	 *
	 * @return An int from the keyboard.
	 */
	public static int readInt() {
		
		//Use the readLine() method to get the String from the keyboard.
		String s = Keyboard.readLine();
		
		//convert the String to an int, and return it..
		return Integer.parseInt(s);
		
	}
	
	/**
	 * This method reads a double from the keyboard.
	 *
	 * @return A string containing a line of text from the keyboard
	 */
	public static double readDouble() {
		
		//Use the readLine() method to get the String from the keyboard.
		String s = Keyboard.readLine();
		
		//convert the String to an double, and return it..
		return Double.parseDouble(s);
		
	}
	
	/**
	 * This method reads a char from the keyboard.
	 *
	 * @return A char from the keyboard
	 */
	public static char readChar() {
		
		//Use the readLine() method to get the String from the keyboard.
		String s = Keyboard.readLine();
		
		//returns the first character in the string
		return s.charAt(0);
		
	}
	
}