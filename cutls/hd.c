#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>
#include <malloc.h>
#include <stdlib.h>

void hexdump(const char* filename, int blocksize, int numblocks);
void print(const char* buffer, int buffer_len, int offset, int blocksize, int numblocks);

int main(int argc, char* argv[])
{
    int blocksize = 8;
    int numblocks = 2;
    int c;    
    
    while((c = getopt(argc, argv, "b:n:")) != -1)
    {
        switch(c)
        {
            case 'b':
                blocksize = atoi(optarg);
            break;
            case 'n':
                numblocks = atoi(optarg);
            break;
        }
    }
    if (argc > optind)
    {
       hexdump(argv[optind], blocksize, numblocks);
    }
    else
    {
        printf("Usage: %s -b <block size> -n <blocks per line> filename\n", argv[0]);
    }
    return 0;
}


void hexdump(const char* filename, int blocksize, int numblocks)
{
    char* buffer;
    int buffer_len;
    int fd = open(filename, O_RDONLY, S_IRUSR | S_IWUSR);

    if (fd != 0)
    {
        buffer_len = numblocks * blocksize;
        buffer = (char *) malloc(buffer_len);

        int num_read;
        int total_read;

        total_read = 0;
        while ((num_read = read(fd, buffer, buffer_len)) > 0)
        {
            print(buffer, num_read, total_read, blocksize, numblocks);
            total_read += num_read;
        }
    }
    printf("\n");
}

void print(const char* buffer, int buffer_len, int offset, int blocksize, int numblocks)
{
    for(int i = 0, index = offset; i < buffer_len; i++, index++)
    {
        if ((index % (blocksize * numblocks)) == 0)
        {
            printf("\n");
        }
        else if (index % blocksize == 0)
        {
            printf("  ");
        }
        if ((index + 1) % blocksize)
        {
            printf("%02x.", buffer[i]);
        }
        else
        {
            printf("%02x", buffer[i]);
        }
    }
}
