import { useState } from 'react'
import ProductItem from './components/ProductItem/ProductItem'
import './App.css'

function App() {
  const data = [
    { id: 1, name: 'Велосипед', price: 1000, count: 1 },
    { id: 2, name: 'Самокат', price: 700, count: 1 },
    { id: 3, name: 'Ролики', price: 1300, count: 2 },
    { id: 4, name: 'Сноуборд', price: 19000, count: 4 },
  ]

  const [products, setProducts] = useState(data)

  const addProduct = () => {
    const input = window.prompt(
      'Введите название и цену через пробел, например: Велосипед 1000',
      'Велосипед 1000',
    )

    if (input === null) return

    const match = input.trim().match(/^(.+?)\s+(\d+(?:[.,]\d{1,2})?)$/)
    const name = match?.[1].trim()
    const price = match ? Number(match[2].replace(',', '.')) : NaN

    if (!name || !Number.isFinite(price) || price < 0) {
      window.alert('Не удалось распознать товар. Формат: «Название 1000».')
      return
    }

    setProducts((prev) => [
      ...prev,
      { id: Date.now(), name, price, count: 1 },
    ])
  }

  const increment = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, count: Math.min(product.count + 1, 25) }
          : product,
      ),
    )
  }

  const decrement = (id) => {
    setProducts((prev) =>
      prev
        .map((product) =>
          product.id === id
            ? { ...product, count: product.count - 1 }
            : product,
        )
        .filter((product) => product.count > 0),
    )
  }

  const remove = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id))
  }

  const total = products.reduce(
    (sum, product) => sum + product.price * product.count,
    0,
  )

  return (
    <main className="page">
      <header className="header">
        <div>
          <p className="eyebrow">useState · корзина</p>
          <h1 className="title">Товары</h1>
        </div>

        <div className="summary">
          <span>{products.length} позиций</span>
          <strong>{total.toLocaleString('ru-RU')} ₽</strong>
        </div>
      </header>

      <button type="button" className="addButton" onClick={addProduct}>
        + Добавить товар
      </button>

      {products.length > 0 ? (
        <section className="grid">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onIncrement={increment}
              onDecrement={decrement}
              onRemove={remove}
            />
          ))}
        </section>
      ) : (
        <p className="empty">Корзина пуста. Добавьте первый товар.</p>
      )}

      <p className="hint">
        Двойной клик по карточке удаляет товар. Количество ограничено
        значением 25, при достижении нуля товар исчезает.
      </p>
    </main>
  )
}

export default App
