import config from '../config/config.js'
import { Client, Databases,  Storage, Query, ID} from 'appwrite'

export class Service{
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
    .setEndpoint(config.appWriteURL)
    .setProject(config.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client)
  }
// CRUD Operation for postlistDocument

   async createPost({Title, slug, content, featured_image, status, user_id}){
       try {
          return await this.databases.createDocument(
            config.appWriteDataBaseId,
            config.appWriteCollectionId,
            slug,
            {
               Title, content, featured_image, status, user_id
            }
          )} catch (error) {
         console.log("AppWrite::CreatePost::Error",error)
       }
   }

   async updatePost(slug, {Title, content, featured_image, status}){
       try {
        return await this.databases.updateDocument(
          config.appWriteDataBaseId,
          config.appWriteCollectionId,
          slug,
           {
              Title,
              content,
              featured_image,
              status
            }
        )} catch (error) {
        console.log("AppWrite::UpdatePost::Error",error)
       }
   }

   async deletePost(slug){
    try {
      await this.databases.deleteDocument(config.appWriteDataBaseId,
        config.appWriteCollectionId,
        slug
        )
      return true
    } catch (error) {
      console.log("AppWrite::DeletePost::Error", error);
      return false
    }
   }

   async getPost(slug){
    try {
     return await this.databases.getDocument(config.appWriteDataBaseId,
        config.appWriteCollectionId,
        slug
        )
    } catch (error) {
      console.log("AppWrite::getPost::Error", error);
      return false
    }
   }

   async getPosts(queries = [Query.equal("status", "active")]){
    try {
     return await this.databases.listDocuments(config.appWriteDataBaseId,
        config.appWriteCollectionId,
        queries
        )
    } catch (error) {
      console.log("AppWrite::getPost::Error", error);
      return false
    }
   }

// File Upload services

   async uploadFile(file){
      try {
        return await this.bucket.createFile(config.appWriteBucketId,
          ID.unique(),
          file
        )
      } catch (error) {
        console.log("AppWrite::UploadFile::Error",error);
        return true
      }
   }

   async deleteFile(fileId){
    try {
      await this.bucket.deleteFile(config.appWriteBucketId, fileId)
      return true
    } catch (error) {
      console.log("AppWriteService::DeleteFile::Error",error);
      return false
    }
   }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(config.appWriteBucketId, fileId)
   }
}
const service = new Service()
export default service
