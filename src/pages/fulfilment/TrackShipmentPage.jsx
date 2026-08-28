import { useState } from 'react'
import { Search, Truck, Package, MapPin, Calendar, CheckCircle2, AlertCircle } from 'lucide-react'

export default function TrackShipmentPage() {
  const [waybillInput, setWaybillInput] = useState('')
  const [shipment, setShipment] = useState(null)
  const [searched, setSearched] = useState(false)

  // Mock shipments database
  const mockShipments = {
    'WAYBILL-849201': {
      id: 'MM1004',
      customer: 'Sipho Khumalo',
      courier: 'The Courier Guy',
      waybill: 'WAYBILL-849201',
      status: 'In Transit',
      destination: 'Sandton, Johannesburg',
      estimatedDelivery: '30 August 2026',
      timeline: [
        { date: '26 Aug - 09:00', event: 'Order placed & verified' },
        { date: '27 Aug - 14:30', event: 'Packed at warehouse' },
        { date: '28 Aug - 08:15', event: 'Handed over to The Courier Guy (JHB Hub)' },
      ]
    },
    'WAYBILL-592014': {
      id: 'MM1008',
      customer: 'Francois Du Plessis',
      courier: 'Dawn Wing',
      waybill: 'WAYBILL-592014',
      status: 'Out for Delivery',
      destination: 'Sea Point, Cape Town',
      estimatedDelivery: 'Today by 17:00',
      timeline: [
        { date: '27 Aug - 10:00', event: 'Order verified & processed' },
        { date: '28 Aug - 06:00', event: 'Arrived at Cape Town Depot' },
        { date: '28 Aug - 08:30', event: 'Out for delivery with local courier' },
      ]
    }
  }

  const handleTrack = (e) => {
    e.preventDefault()
    const query = waybillInput.trim().toUpperCase()
    setSearched(true)
    if (mockShipments[query]) {
      setShipment(mockShipments[query])
    } else {
      setShipment(null)
    }
  }

  return (
    <section className="container" style={{ padding: '48px 0', maxWidth: '800px' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>
          <Truck size={14} /> Parcel Tracking
        </div>
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: 'var(--green-dark)', letterSpacing: '-0.02em' }}>Track Your Shipment</h1>
        <p style={{ color: 'var(--muted)', fontSize: '15px', marginTop: '6px' }}>
          Enter your waybill or tracking number below to view real-time delivery status updates.
        </p>
      </div>

      <form onSubmit={handleTrack} className="panel" style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }} />
          <input 
            type="text" 
            placeholder="Enter Waybill No. (e.g. WAYBILL-849201)..." 
            value={waybillInput}
            onChange={(e) => setWaybillInput(e.target.value)}
            className="search"
            style={{ width: '100%', paddingLeft: '40px', padding: '12px 14px 12px 40px', fontSize: '14px' }}
          />
        </div>
        <button type="submit" style={{ padding: '12px 24px', fontSize: '14px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          Track Parcel <Truck size={16} />
        </button>
      </form>

      {searched && (
        shipment ? (
          <div className="panel" style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
              <div>
                <span style={{ color: 'var(--muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Waybill Reference</span>
                <h3 style={{ margin: '4px 0 0', fontSize: '20px', color: 'var(--green-dark)', fontWeight: '700' }}>{shipment.waybill}</h3>
              </div>
              <span style={{ 
                background: 'var(--soft)', 
                color: 'var(--green)', 
                padding: '6px 14px', 
                borderRadius: '20px', 
                fontSize: '12px', 
                fontWeight: '600',
                border: '1px solid var(--border)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <CheckCircle2 size={14} /> {shipment.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'var(--soft)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--muted)', fontSize: '12px', display: 'block', marginBottom: '4px' }}>Courier Partner</span>
                <strong style={{ color: 'var(--green-dark)', fontSize: '14px' }}>{shipment.courier}</strong>
              </div>
              <div style={{ background: 'var(--soft)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--muted)', fontSize: '12px', display: 'block', marginBottom: '4px' }}>Destination</span>
                <strong style={{ color: 'var(--green-dark)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} /> {shipment.destination}
                </strong>
              </div>
              <div style={{ background: 'var(--soft)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--muted)', fontSize: '12px', display: 'block', marginBottom: '4px' }}>Estimated Delivery</span>
                <strong style={{ color: 'var(--green-dark)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} /> {shipment.estimatedDelivery}
                </strong>
              </div>
            </div>

            <div>
              <h4 style={{ margin: '0 0 16px', fontSize: '15px', color: 'var(--green-dark)', fontWeight: '600' }}>Transit History</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderLeft: '2px solid var(--border)', paddingLeft: '16px', marginLeft: '6px' }}>
                {shipment.timeline.map((item, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-23px', top: '4px', width: '10px', height: '10px', background: 'var(--green)', borderRadius: '50%', border: '2px solid white' }} />
                    <span style={{ color: 'var(--muted)', fontSize: '12px', display: 'block' }}>{item.date}</span>
                    <p style={{ margin: '2px 0 0', color: 'var(--green-dark)', fontSize: '13px', fontWeight: '500' }}>{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="panel" style={{ textAlign: 'center', padding: '48px 24px', background: 'white', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <AlertCircle size={40} style={{ color: 'var(--gold)' }} />
            <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--green-dark)', fontWeight: '600' }}>No shipment found</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '360px', margin: 0 }}>
              We couldn't locate a shipment matching "{waybillInput}". Please double-check your waybill number and try again. (Tip: Try <strong>WAYBILL-849201</strong>)
            </p>
          </div>
        )
      )}
    </section>
  )
}