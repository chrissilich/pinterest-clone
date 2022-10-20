import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyBTl-d2TV97SKMt0DYsTC4Ii6I4pL_hoG4',
	authDomain: 'reddit-thing-e400e.firebaseapp.com',
	projectId: 'reddit-thing-e400e',
	storageBucket: 'reddit-thing-e400e.appspot.com',
	messagingSenderId: '207177830866',
	appId: '1:207177830866:web:272006c91390cea107780b',
	measurementId: 'G-TWQ84XSPRQ',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider()
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const tagsRef = collection(db, 'tags')
// const imagesRef = collection(db, "images");

async function storeThing(value1, value2) {
	try {
		const docRef = await addDoc(collection(db, 'test-collection'), {
			morestuff: value1,
			testkey: value2,
		})
		console.log('Document written with ID: ', docRef.id)
	} catch (e) {
		console.error('Error adding document: ', e)
	}
}

async function storeTaggedImage(tagId, image) {
	console.log('storeTaggedImage', tagId, image)
	try {
		const docRef = await addDoc(collection(db, 'tagged'), {
			tag: tagId,
			user: auth.currentUser.uid,
			image,
		})
		console.log('Document written with ID: ', docRef.id)
		return docRef
	} catch (e) {
		console.error('Error adding document: ', e)
	}
}

async function storeTag(tagName) {
	try {
		const docRef = await addDoc(collection(db, 'tags'), {
			text: tagName,
			user: auth.currentUser.uid,
		})
		console.log('Document written with ID: ', docRef.id)
		return docRef
	} catch (e) {
		console.error('Error adding document: ', e)
	}
}

async function getTags() {
	try {
		if (!auth || !auth.currentUser) return []
		// Create a query against the collection.
		const q = query(tagsRef, where('user', '==', auth.currentUser.uid))
		const querySnapshot = await getDocs(q)
		let simplified = []
		querySnapshot.forEach((doc) => {
			simplified.push({ id: doc.id, ...doc.data() })
		})
		return simplified
	} catch (e) {
		console.error('Error finding document: ', e)
	}
}

function promptSignIn() {
	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result)
			const token = credential.accessToken
			// The signed-in user info.
			const user = result.user
			// ...
			console.log('sign in successful')
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code
			const errorMessage = error.message
			// The email of the user's account used.
			const email = error.customData.email
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error)
			// ...
			console.warn('sign in FAILED')
		})
}
function promptSignOut() {
	signOut(auth, provider)
		.then((result) => {
			console.log('signed out successful')
		})
		.catch((error) => {
			const errorCode = error.code
			const errorMessage = error.message
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error)
			// ...
			console.warn('sign out FAILED')
		})
}

export { firebaseApp, auth, promptSignIn, promptSignOut, storeThing, getTags, storeTag, storeTaggedImage }
