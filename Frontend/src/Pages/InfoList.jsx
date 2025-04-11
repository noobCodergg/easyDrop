import React, { useEffect, useState } from 'react'
import { getInfo } from '../Api/Info/InfoApi'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '../Components/ui/table'

const InfoList = () => {
  const [info, setInfo] = useState([])

  const fetchInfo = async () => {
    try {
      const response = await getInfo()
      setInfo(response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  return (
    <div className="max-w-[1300px] w-full mx-auto bg-white p-6 rounded-lg ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sl.</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Won</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {info.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.prize}</TableCell>
              <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default InfoList
