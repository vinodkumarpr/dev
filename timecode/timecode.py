import sys

TIMECODE_SMPTE_FORMAT = 1
TIMECODE_MSECS_FORMAT = 2
TIMECODE_INVALID = -1

def timecode_type(timecode):
    sep = timecode[8:9]
    if sep == ':':
        return TIMECODE_SMPTE_FORMAT
    elif sep == '.':
        return TIMECODE_MSECS_FORMAT
    return TIMECODE_INVALID

def is_valid_smpte_timecode(timecode, fps):
    return (len(timecode) == 11 and int(timecode[9:11]) < fps)

def is_valid_msec_timecode(timecode):
	length = len(timecode)
	return (length > 9 and length < 13)

def get_frames_smpte(ff, fps):
    print("smpte frames ", ff[:2])
    return int(ff[:2])

def get_frames_from_msec(msecs, fps):
    print("msec frames ", msecs)
    length = len(msecs)
    factor = 1
    if length == 3:
        factor = 1
    elif length == 2:
        factor = 10
    elif length == 1:
        factor = 100    
    frames = int(msecs) * factor * fps / 1000.0
    return frames
		
def timecode_to_frames(timecode, fps):
    type = timecode_type(timecode)
    if type == TIMECODE_SMPTE_FORMAT and is_valid_smpte_timecode(timecode, fps):
        frames = get_frames_smpte(timecode[9:11], fps)
    elif type == TIMECODE_MSECS_FORMAT and is_valid_msec_timecode(timecode):
        frames = get_frames_from_msec(timecode[9:], fps)	
    else:
        raise ValueError('Incorrect timecode format', timecode)
    print("frames ", frames)
    return	int(round((int(timecode[:2]) * 3600 +
			int(timecode[3:5]) * 60 +
			int(timecode[6:8])) * fps
			+ frames))

def frame_to_timecode(frames, fps, smpte):
    sep = ':'
    fph = fps * 3600
    fpm = fps * 60
    hh = int(frames // fph)
    mm = int((frames - hh * fph) // fpm)
    ss = int((frames - hh * fph - mm * fpm) // fps)
    if smpte:
        ff = int(round(frames -  hh * fph - mm * fpm - ss * fps))
        ff_len = 2
        fff_sep = ':'
    else:
        ff = int(round ( (frames -  hh * fph - mm * fpm - ss * fps) * 1000 / fps ))
        ff_len = 3
        fff_sep = '.'
       
    return(
	str(hh).zfill(2) + sep + 
	str(mm).zfill(2) + sep +
	str(ss).zfill(2) + fff_sep +
	str(ff).zfill(ff_len))

if __name__ == "__main__":
    if (len(sys.argv) > 2):
        type = timecode_type(sys.argv[1])
        if type == TIMECODE_SMPTE_FORMAT:
            ret = is_valid_smpte_timecode(sys.argv[1], int(sys.argv[2]))
        elif type == TIMECODE_MSECS_FORMAT:
            ret = is_valid_msec_timecode(sys.argv[1])
        else:
            ret = False
        print (type, ret)
        if ret:
            fps = int(sys.argv[2])
            frames = timecode_to_frames(sys.argv[1], fps)
            print "Total frames", frames
            timecode = frame_to_timecode(frames, fps, True)
            print(timecode)
            timecode = frame_to_timecode(frames, fps, False)
            print(timecode)
		
