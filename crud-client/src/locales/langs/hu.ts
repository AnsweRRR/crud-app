const hu = {
  home: 'Főoldal',
  users: 'Felhasználók',
  language: 'Nyelv',
  languages: {
    en: 'Angol',
    hu: 'Magyar'
  },
  theme: 'Téma',
  light: 'Világos',
  dark: 'Sötét',
  system: 'Rendszer',
  themes: {
    default: 'Alapértelmezett',
    red: 'Piros',
    rose: 'Rózsaszín',
    orange: 'Narancssárga',
    green: 'Zöld',
    blue: 'Kék',
    yellow: 'Sárga',
    violet: 'Lila',
  },
  maintenance: 'Karbantartás',
  user: 'Felhasználó',
  welcome: 'Üdvözöljük a CRUD alkalmazásban!',
  app_name: 'CRUD App',
  crud: {
    actions: 'Műveletek',
    delete_confirm_title: 'Biztosan törölni szeretnéd ezt az elemet?',
    delete_confirm_description: 'Ez a művelet nem vonható vissza.',
    cancel: 'Mégse',
    delete: 'Törlés',
    edit: 'Szerkesztés',
    audit: 'Napló',
    create: 'Létrehozás',
    update: 'Frissítés',
    save: 'Mentés',
    close: 'Bezárás',
    search: 'Keresés',
    no_results: 'Nincs találat',
    loading: 'Betöltés...',
    error: 'Hiba történt',
    success: 'Sikeres művelet',
    select_all: 'Összes kiválasztása',
    deselect_all: 'Kijelölés megszüntetése',
    selected_items: 'Kiválasztott elem',
    bulk_delete: 'Tömeges törlés',
    bulk_delete_confirm: 'Biztosan törölni szeretnéd a kiválasztott elemeket?',
    bulk_delete_success: 'A kiválasztott elemek sikeresen törölve',
    bulk_delete_error: 'Hiba történt a törlés során',
    bulk_activate: 'Tömeges aktiválás',
    bulk_activate_success: 'A kiválasztott elemek sikeresen aktiválva',
    bulk_activate_error: 'Hiba történt az aktiválás során',
    bulk_inactivate: 'Tömeges deaktiválás',
    bulk_inactivate_success: 'A kiválasztott elemek sikeresen deaktiválva',
    bulk_inactivate_error: 'Hiba történt a deaktiválás során',
    fill_fields: 'Töltsd ki az alábbi mezőket, majd kattints a Mentés gombra.',
    audit_data: 'Audit adatok',
    audit_description: 'A kiválasztott elem audit információi.',
    id: 'Azonosító',
    created_at: 'Létrehozva',
    created_by: 'Létrehozta',
    modified_at: 'Módosítva',
    modified_by: 'Módosította',
    select_placeholder: 'Válassz...'
  },
  ui: {
    table: {
      select_all: 'Összes kijelölése',
      select_row: 'Sor kijelölése',
      no_results: 'Nincs találat',
      rows_per_page: 'Sorok száma oldalanként',
      of: 'az összesből',
      next_page: 'Következő oldal',
      previous_page: 'Előző oldal',
      first_page: 'Első oldal',
      last_page: 'Utolsó oldal',
      search: 'Keresés...',
      columns: 'Oszlopok',
      show_columns: 'Oszlopok megjelenítése',
      hide_columns: 'Oszlopok elrejtése',
      filter: 'Szűrés',
      clear_filters: 'Szűrők törlése',
      export: 'Exportálás',
      refresh: 'Frissítés'
    },
    dialog: {
      close: 'Bezárás'
    },
    button: {
      save: 'Mentés',
      cancel: 'Mégse',
      delete: 'Törlés',
      edit: 'Szerkesztés',
      create: 'Létrehozás',
      update: 'Frissítés',
      search: 'Keresés',
      filter: 'Szűrés',
      export: 'Exportálás',
      refresh: 'Frissítés',
      close: 'Bezárás'
    },
    input: {
      search: 'Keresés...',
      filter: 'Szűrés...'
    },
    select: {
      placeholder: 'Válassz...',
      no_options: 'Nincs találat',
      loading: 'Betöltés...'
    },
    checkbox: {
      select_all: 'Összes kijelölése',
      select_row: 'Sor kijelölése'
    }
  },
  pages: {
    users: {
      title: 'Felhasználók',
      columns: {
        name: 'Név',
        comment: 'Megjegyzés',
        isActive: 'Aktív',
        role: 'Szerep'
      },
      fields: {
        name: 'Név',
        comment: 'Megjegyzés',
        isActive: 'Aktív',
        role: 'Szerep'
      },
      roles: {
        admin: 'Admin',
        user: 'Felhasználó',
        guest: 'Vendég'
      }
    }
  }
}

export default hu;