import { HMS_GEOGRAPHY_COUNTRY } from '../../types/geography'
import type { HealthArea } from '../../types/geography'

/**
 * Aires de santé RDC — échantillon MVP pour valider la hiérarchie complète.
 * Extension progressive via le registre (sans GeoJSON à ce stade).
 */
export const healthAreas: HealthArea[] = [
  {
    id: 'nk-as-goma-centre',
    name: 'Aire de santé Goma Centre',
    parentId: 'nk-hz-goma',
    code: 'CD-NK-AS-GOM-C',
    country: HMS_GEOGRAPHY_COUNTRY,
    province: 'Nord-Kivu',
    territory: 'Goma',
    healthZone: 'Goma',
  },
  {
    id: 'nk-as-karisimbi-nord',
    name: 'Aire de santé Karisimbi Nord',
    parentId: 'nk-hz-karisimbi',
    code: 'CD-NK-AS-KAR-N',
    country: HMS_GEOGRAPHY_COUNTRY,
    province: 'Nord-Kivu',
    territory: 'Goma',
    healthZone: 'Karisimbi',
  },
  {
    id: 'nk-as-nyiragongo-est',
    name: 'Aire de santé Nyiragongo Est',
    parentId: 'nk-hz-nyiragongo',
    code: 'CD-NK-AS-NYG-E',
    country: HMS_GEOGRAPHY_COUNTRY,
    province: 'Nord-Kivu',
    territory: 'Nyiragongo',
    healthZone: 'Nyiragongo',
  },
  {
    id: 'sk-as-ibanda-centre',
    name: 'Aire de santé Ibanda Centre',
    parentId: 'sk-hz-ibanda',
    code: 'CD-SK-AS-IBA-C',
    country: HMS_GEOGRAPHY_COUNTRY,
    province: 'Sud-Kivu',
    territory: 'Bukavu',
    healthZone: 'Ibanda',
  },
  {
    id: 'sk-as-kadutu-sud',
    name: 'Aire de santé Kadutu Sud',
    parentId: 'sk-hz-kadutu',
    code: 'CD-SK-AS-KAD-S',
    country: HMS_GEOGRAPHY_COUNTRY,
    province: 'Sud-Kivu',
    territory: 'Bukavu',
    healthZone: 'Kadutu',
  },
  {
    id: 'it-as-bunia-ville',
    name: 'Aire de santé Bunia Ville',
    parentId: 'it-hz-bunia',
    code: 'CD-IT-AS-BUN-V',
    country: HMS_GEOGRAPHY_COUNTRY,
    province: 'Ituri',
    territory: 'Irumu',
    healthZone: 'Bunia',
  },
]
