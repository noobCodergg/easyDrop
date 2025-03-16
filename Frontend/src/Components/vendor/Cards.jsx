import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const Cards = () => {
  const data = [
    {
      title: "Total Orders",
      amount: 2000,
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Accepted Orders",
      amount: 1000,
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Pending Orders",
      amount: 500,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Cancelled Orders",
      amount: 500,
      color: "bg-red-100 text-red-800",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 p-4 mb-10">
      {data.map((item, index) => (
        <Card key={index} className="w-full shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                {item.amount}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${item.color}`}
              >
                {item.title.split(" ")[0]}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Cards
