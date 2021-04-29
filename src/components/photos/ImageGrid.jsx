import React, { useContext } from 'react';
import useDatabase from '../hooks/useDatabase';
import { AuthContext } from '../authentication/AuthContext';
import { motion } from 'framer-motion';

export default function ImageGrid({ setSelectedImage, allImages }) {
  const { currentUser } = useContext(AuthContext);

  const user = allImages ? null : currentUser.uid;

  const { docs } = useDatabase('images', user);

  return (
    <div className={"img-grid"}>
      { docs && docs.map(doc => (
        <motion.div className="img-wrap" key={doc.id} 
        layout whileHover={{ opacity: 1 }} 
        onClick={() => setSelectedImage(doc.url) } >
          <motion.img src={doc.url} alt="uploaded image" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }} />
        </motion.div>
      ))}
    </div>
  )
}