import styles from '@/styles/Inventory.module.css'
import { useControls } from '@/utils/useControls'
import { createInventorySlice } from '@/stores/inventory.store'
import { mockInventory } from '@/stores/inventory.mock'

// {
//     "items": [
//         {
//             "itemName": "stone",
//             "quantity": 3,
//             "type": "resources",
//             "icon": "https://cdn.iconscout.com/icon/free/png-256/free-stone-11-449918.png"
//         },
//         {
//             "itemName": "wood",
//             "quantity": 3,
//             "type": "resources",
//             "icon": "https://cdn2.iconfinder.com/data/icons/food-icons-6/200/farm_wood-512.png"
//     ]
// }

const Inventory = () => {
  const { inventory } = useControls()
  const inventoryItems = createInventorySlice((state) => state.inventory)
  const debug = mockInventory

  if (!inventory) return null

  return (
    <div className={styles.inventory}>
      {inventoryItems.items.map((item, index) => (
        <div key={index} className={styles.inventoryItem}>
          <img src={item.icon} alt={item.itemName} className={styles.itemIcon} />
          <div className={styles.itemInfo}>
            <p className={styles.itemName}>{item.itemName}</p>
            <p className={styles.itemQuantity}>x{item.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Inventory
