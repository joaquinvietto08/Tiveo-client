#Bottom-Sheet
npx expo install react-native-reanimated react-native-gesture-handler
npm install @gorhom/bottom-sheet

#Add on babel
plugins: ["react-native-reanimated/plugin"]

#################################################

#Firebase
npx expo install expo-router expo-linking
npx expo install expo-build-properties
npx expo install @react-native-firebase/app
npx expo install @react-native-firebase/auth
npm install @react-native-async-storage/async-storage //for the moment firebase handles this, it is not necessary
npm install firebase

#Create firebaseConfig.js

#################################################

#Signin with Google
npx expo install @react-native-google-signin/google-signin

#Add lines on app.json

#Create android/ios fold (If it returns an error but the folders are created, it's okay)
npx expo prebuild

#Get SHA1 Certificate Fingerprints for firebase
cd .\android\
./gradlew signinReport 

#Add android/ios .json firebase's files and re-run 
npx expo prebuild

#Add on android/build.gradle 
googlePlayServicesAuthVersion = "20.7.0"

#Add on android/app/build.gradle 
apply plugin: 'com.google.gms.google-services'

#################################################

#Run command
npx expo run

#Doc
https://rnfirebase.io/

#################################################

#Signin with facebook
npm install --save react-native-fbsdk-next

#Add on android/settings.gradle
include ':react-native-fbsdk-next'
project(':react-native-fbsdk-next').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-fbsdk-next/android')

#Add on android/app/build.gradle 
implementation 'com.facebook.android:facebook-android-sdk:latest.release'

#Add on android\app\src\main\java\com\tiveo\tiveo\MainApplication.kt
import com.facebook.FacebookSdk;

#Add on android\app\src\main\res\values\strings.xml
<string name="facebook_app_id">393195440171062</string>

#Add on android\app\src\main\AndroidManifest.xml
<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>



#Add on android/build.gradle 
mavenCentral()

