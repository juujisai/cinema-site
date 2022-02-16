import ca1 from '../media/imageHost/ca1.webp'
import ca2 from '../media/imageHost/ca2.webp'
import ca3 from '../media/imageHost/ca3.webp'
import dk1 from '../media/imageHost/dk1.webp'
import dk2 from '../media/imageHost/dk2.webp'
import dk3 from '../media/imageHost/dk3.webp'
import dlu1 from '../media/imageHost/dlu1.webp'
import dlu2 from '../media/imageHost/dlu2.webp'
import dlu3 from '../media/imageHost/dlu3.webp'
import int1 from '../media/imageHost/int1.webp'
import int2 from '../media/imageHost/int2.webp'
import int3 from '../media/imageHost/int3.webp'
import ip1 from '../media/imageHost/ip1.webp'
import ip2 from '../media/imageHost/ip2.webp'
import ip3 from '../media/imageHost/ip3.webp'
import k1 from '../media/imageHost/k1.webp'
import k2 from '../media/imageHost/k2.webp'
import k3 from '../media/imageHost/k3.webp'
import leg1 from '../media/imageHost/leg1.webp'
import leg2 from '../media/imageHost/leg2.webp'
import leg3 from '../media/imageHost/leg3.webp'
import ls1 from '../media/imageHost/ls1.webp'
import ls2 from '../media/imageHost/ls2.webp'
import ls3 from '../media/imageHost/ls3.webp'
import m1 from '../media/imageHost/m1.webp'
import m2 from '../media/imageHost/m2.webp'
import m3 from '../media/imageHost/m3.webp'
import vendetta1 from '../media/imageHost/vendetta1.webp'
import vendetta2 from '../media/imageHost/vendetta2.webp'
import vendetta3 from '../media/imageHost/vendetta3.webp'

export const getSource = (i) => {
  let source;
  let images = [ca1, ca2, ca3, dk1, dk2, dk3, dlu1, dlu2, dlu3, int1, int2, int3, ip1, ip2, ip3, k1, k2, k3, leg1, leg2, leg3, ls1, ls2, ls3, m1, m2, m3, vendetta1, vendetta2, vendetta3]

  let a = images.filter(item => item.includes(i))
  a.length === 0 ? source = ca1 : source = a[0]

  return source


}





