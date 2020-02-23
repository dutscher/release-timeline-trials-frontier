export interface Release {
    date: string, // 22.02.2020 - day.month.year
    icon: string, // https://i.imgur.com/cZyTO28.png
    version: string, // release version in store 7.9.0
    fixfor?: string, // version fix of major
    anniversary?: number // anniversary edition
    notes?: string, // Meet Orbie the friendly intergala...
    youtube?: string, // offical youtube video https://www.youtube.com/watch?v=-O6YYsvjk9w
    forum?: string, // https://forums.ubisoft.com/showthread.php/2013404-New-Update-Orbie-s-Quest!
    event?: ReleaseEvent,
}

export interface ReleaseEvent {
    name: string, // Harley Davidson EV
    type: 'hunt' | 'grind' | 'mc' | 'fanpoints' | 'rally',
    img?: [string] | string, // ["https://i.imgur.com/cZyTO28.png", "https://i.imgur.com/ue9OQh4.png"]
    guide?: string, // https://forums.ubisoft.com/showthread.php/2146933-2019-Halloween-Event-Guide
    category?: number, // 19 -> means category of tracks in trackmap, https://trialstrackmap.sb-f.de/#filterCat=bmw-rally
}