import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({$id,title,featuredImage}) { // id variable ka naam $id in appwrite
  return (
    //In to={/post/${$id}}, the first $ is for JavaScript template literals (string interpolation in JavaScript), and the second $ is because the variable name is actually $id, as Appwrite often prefixes IDs with $.
    <Link to={`/post/${$id}`}> 
    <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
            className='rounded-xl' />
       
        </div>
        {/* In Appwrite, files are stored in buckets and each file has a unique file ID.
        The featuredImage passed to PostCard is the ID of that image file in Appwrite.
        appwriteService.getFilePreview(featuredImage) fetches the image preview URL from Appwrite. */}
        <h2
        className='text-xl font-bold'
        >{title}</h2>
    </div>
</Link>
  )
}

export default PostCard
