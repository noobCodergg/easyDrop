import { getPrizes, updatePrize, postPrize } from '../Api/PrizeApi/PrizeApi'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../Components/ui/table"
import { Button } from "../Components/ui/button"

const ManagePrize = () => {
  const [prizes, setPrizes] = useState([])
  const [refresh, setRefresh] = useState(false) 
  const [isOpen,setIsOpen]=useState(false)
  const [name,setName]=useState('')
  const [error,setError]=useState();
 
  const handleModal=()=>{
    setIsOpen(!isOpen)
  }
  const handleNameChange=(e)=>{
    setName(e.target.value)
  }

  const handlePostPrize=async()=>{
    if(name===''){
        setError("Input Filed is required")
        return
    }else{
        try{
            const response=await postPrize(name)
            console.log(response)
        }catch(error){
            console.log(error)
        }
        setIsOpen(!isOpen)
        setRefresh(!refresh)
    }
    
  }

  const fetchPrizes = async () => {
    try {
      const response = await getPrizes()
      setPrizes(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPrizes()
  }, [refresh]) // ✅ fetch again whenever refresh changes

  const handleUpdate = async (id, value) => {
    try {
      const response = await updatePrize(id, value)
      console.log(response)
      setRefresh(prev => !prev) // ✅ toggle to trigger re-fetch
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-[1300px] w-full mx-auto bg-white p-6 rounded-lg ">
     <Button variant='logInButton' onClick={handleModal}>Create New</Button>
    
     {isOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
      <input
        type="text"
        placeholder="Enter Prize name"
        value={name}
        onChange={handleNameChange}
        className="w-full px-4 py-2 border rounded mb-4"
        
      />
      {error && <p className='mb-2 text-red-600'>{error}</p>}
      <Button
        onClick={handlePostPrize}
        variant='logInButton'
      >
        Save
      </Button>
    </div>
  </div>
)}

      <Table className='mt-10'>
        <TableHeader>
          <TableRow>
            <TableHead>Sl.</TableHead>
            <TableHead>Prize Name</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prizes.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.prize_name}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  onClick={() => handleUpdate(item.id, item.visible ? 0 : 1)}
                >
                  {item.visible ? 'Hidden' : 'Visible'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ManagePrize
