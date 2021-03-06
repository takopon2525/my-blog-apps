import { createStore } from "vuex";
import { auth, db, storage } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import {
  collection,
  getDoc,
  doc,
  query,
  orderBy,
  setDoc,
  Timestamp,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import router from "../router/index";

const store = createStore({
  state: {
    unsubscribe: null,
    user: null,
    userInfo: {},
    blogId: null,
    blogPosts: [],
    blogHTML: "ここから入力してください。",
    blogTitle: null,
    blogTitleImageFile: null,
    blogTitleImageName: null,
    blogTitleImageURL: null,
    snackbar: false,
    snackMessage: null,
    snackType: null,
  },
  mutations: {
    init(state) {
      state.blogHTML = "ここから入力してください。";
      state.blogId = null;
      state.blogTitle = null;
      state.blogTitleImageFile = null;
      state.blogTitleImageName = null;
      state.blogTitleImageURL = null;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    setBlogPosts(state, payload) {
      state.blogPosts = payload;
    },
    setBlogHTML(state, payload) {
      state.blogHTML = payload;
    },
    setBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    setBlogId(state, payload) {
      state.blogId = payload;
    },
    setBlogTitleImageFile(state, payload) {
      state.blogTitleImageFile = payload;
    },
    setBlogId(state, payload) {
      state.blogId = payload;
    },
    setBlogTitleImageName(state, payload) {
      state.blogTitleImageName = payload;
    },
    setBlogTitleImageURL(state, payload) {
      state.blogTitleImageURL = payload;
    },
    setSnack(state, { isOpen, message, type }) {
      state.snackbar = isOpen;
      state.snackMessage = message;
      state.snackType = type;
    },
  },
  actions: {
    startPostsListner(context) {
      const q = query(collection(db, "blogPost"), orderBy("date", "desc"));
      context.state.unsubscribe = onSnapshot(q, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          const data = {
            blogId: doc.data().blogId,
            blogHTML: doc.data().blogHTML,
            blogTitle: doc.data().blogTitle,
            blogImageName: doc.data().blogImageName,
            blogImageURL: doc.data().blogImageURL,
            blogCreatedAt: doc.data().blogCreatedAt,
            blogEditedAt: doc.data().blogEditedAt,
            blogCreatedBy: doc.data().blogCreatedBy,
            blogEditedBy: doc.data().blogEditedBy,
          };
          results.push(data);
        });
        context.commit("setBlogPosts", results);
      });
    },
    stopPostsListner(context) {
      context.state.unsubscribe();
    },
    async login(context, { email, password }) {
      try {
        await setPersistence(auth, browserSessionPersistence);
        const res = await signInWithEmailAndPassword(auth, email, password);
        if (!res) throw new Error("could not complete login");
      } catch (err) {
        alert(err.message);
      }
    },
    async logout(context) {
      await signOut(auth);
      context.commit("setUser", null);
    },
    async signup(context, { email, password }) {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (!res) {
        throw new Error("could not complete signup");
      }
    },
    async userSettings(context, { nickName, uid, email }) {
      const docRef = doc(db, "users", uid);
      const docData = {
        name: nickName,
        email: email,
      };
      await setDoc(docRef, docData);
    },
    async updateUser(context, { nickName }) {
      const docRef = doc(db, "users", context.state.user.uid);
      const docData = {
        name: nickName,
      };
      await updateDoc(docRef, docData);
    },
    async getUser(context) {
      const docRef = doc(db, "users", context.state.user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        context.commit("setUserInfo", { ...docSnap.data() });
      } else {
        context.commit("setUserInfo", {});
      }
    },
    async uploadPost(context) {
      const storageRef = ref(
        storage,
        `documents/blogTitlePhotos/${context.state.blogTitleImageName}`
      );
      const uploadTask = uploadBytesResumable(
        storageRef,
        context.state.blogTitleImageFile
      );
      uploadTask.on(
        "state_changed",
        async (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        async () => {
          const downLoadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const docRef = doc(collection(db, "blogPost"));
          const timestamp = Date.now();
          const docData = {
            blogId: docRef.id,
            blogTitle: context.state.blogTitle,
            blogImageName: context.state.blogTitleImageName,
            blogImageURL: downLoadURL,
            blogHTML: context.state.blogHTML,
            blogCreatedAt: Timestamp.fromDate(new Date()),
            blogCreatedBy: context.state.userInfo.name,
            date: timestamp,
          };
          await setDoc(docRef, docData);
          router.push({ path: "/" });
        }
      );
    },
    async editPostAll(context) {
      const storageRef = ref(
        storage,
        `documents/blogTitlePhotos/${context.state.editBlogTitleImageName}`
      );
      const uploadTask = uploadBytesResumable(
        storageRef,
        context.state.editBlogTitleImageFile
      );
      uploadTask.on(
        "state_changed",
        async (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        async () => {
          const downLoadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const docRef = doc(db, "blogPost", context.state.blogId);
          const timestamp = await Date.now();
          const docData = {
            blogId: docRef.id,
            blogTitle: context.state.blogTitle,
            blogImageURL: downLoadURL,
            blogHTML: context.state.blogHTML,
            blogEditedAt: Timestamp.fromDate(new Date()),
            date: timestamp,
            blogEditedBy: context.state.userInfo.name,
          };
          await updateDoc(docRef, { ...docData });
          router.push({ path: "/" });
        }
      );
    },
    async editPost(context) {
      const docRef = doc(db, "blogPost", context.state.blogId);
      const timestamp = Date.now();
      const docData = {
        blogId: docRef.id,
        blogTitle: context.state.blogTitle,
        blogHTML: context.state.blogHTML,
        blogEditedAt: Timestamp.fromDate(new Date()),
        date: timestamp,
        blogEditedBy: context.state.userInfo.name,
      };
      await updateDoc(docRef, { ...docData });
      router.push({ path: "/" });
    },
    async deleteBlog(context, { blogId }) {
      await deleteDoc(doc(db, "blogPost", blogId));
    },
  },
});

onAuthStateChanged(auth, (user) => {
  store.commit("setUser", user);
});

export default store;
