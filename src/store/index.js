import { createStore } from "vuex";
import { db, storage } from "../firebase/config";
import {
  collection,
  getDoc,
  doc,
  query,
  orderBy,
  setDoc,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import router from "../router/index";

const store = createStore({
  state: {
    unsubscribe: null,
    blogPosts: [],
    blogHTML: "ここから入力してください。",
    blogTitle: null,
    blogTitleImageFile: null,
    blogTitleImageName: null,
    blogTitleImageURL: null,
  },
  mutations: {
    init(state) {
      state.blogHTML = "ここから入力してください。";
      state.blogTitle = null;
      state.blogTitleImageFile = null;
      state.blogTitleImageName = null;
      state.blogTitleImageURL = null;
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
    setBlogTitleImageFile(state, payload) {
      state.blogTitleImageFile = payload;
    },
    setBlogTitleImageName(state, payload) {
      state.blogTitleImageName = payload;
    },
    setBlogTitleImageURL(state, payload) {
      state.blogTitleImageURL = payload;
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
            blogImageURL: doc.data().blogImageURL,
            blogCreatedAt: doc.data().blogCreatedAt,
          };
          results.push(data);
        });
        context.commit("setBlogPosts", results);
      });
    },
    stopPostsListner(context) {
      context.state.unsubscribe();
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
            date: timestamp,
          };
          await setDoc(docRef, docData);
          router.push({ path: "/" });
        }
      );
    },
  },
});

export default store;
