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

#Signin with Google
npx expo install @react-native-google-signin/google-signin

#Make changes on app.json

#Create andorid/ios fold (If it returns an error but the folders are created, it's okay)
npx expo prebuild

#Get SHA1 Certificate Fingerprints for firebase
cd .\android\
./gradlew signinReport 

#Add android/ios .json firebase's files and re-run 
npx expo prebuild

#Create firebaseConfig.js

#Doc
https://rnfirebase.io/

#################################################