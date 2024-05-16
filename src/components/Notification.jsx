const Notification = ({ style }) => {
  return (
    <span
      className={`position-absolute translate-middle p-1 bg-danger border border-light rounded-circle ${style}`}
    >
      <span className="visually-hidden">Nuevas alertas</span>
    </span>
  )
}

export default Notification
