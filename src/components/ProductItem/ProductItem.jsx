import styles from './ProductItem.module.css'

function ProductItem({ product, onIncrement, onDecrement, onRemove }) {
  const { id, name, price, count } = product

  const stop = (event) => event.stopPropagation()

  return (
    <article
      className={styles.card}
      onDoubleClick={() => onRemove(id)}
      title="Двойной клик — удалить товар"
    >
      <div className={styles.top}>
        <h2 className={styles.name}>{name}</h2>
        <span className={styles.price}>{price.toLocaleString('ru-RU')} ₽</span>
      </div>

      <div className={styles.bottom}>
        <div className={styles.counter} onClick={stop} onDoubleClick={stop}>
          <button
            type="button"
            className={styles.control}
            onClick={() => onDecrement(id)}
            aria-label={`Уменьшить количество ${name}`}
          >
            −
          </button>
          <span className={styles.count} aria-live="polite">
            {count}
          </span>
          <button
            type="button"
            className={styles.control}
            onClick={() => onIncrement(id)}
            disabled={count >= 25}
            aria-label={`Увеличить количество ${name}`}
          >
            +
          </button>
        </div>

        <span className={styles.sum}>
          {(price * count).toLocaleString('ru-RU')} ₽
        </span>
      </div>
    </article>
  )
}

export default ProductItem
