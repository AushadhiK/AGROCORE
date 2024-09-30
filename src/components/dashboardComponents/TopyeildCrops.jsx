import React from 'react'

function TopyeildCrops({crop}) {
  return (
    <tr>
      <th scope="row">
        <a href="#">
          <img src={crop.preview} alt="" />
        </a>
      </th>
      <td>
        <a href="#" className="text-primary fw-bold">
          {crop.name}
        </a>
      </td>
      <td>Rs.{crop.price.toFixed(2)}</td>
      <td className="fw-bold">{crop.sold}</td>
      <td>Rs.{(crop.price * crop.sold).toLocaleString('en-US')}</td>
    </tr>
  )
}

export default TopyeildCrops