#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>
#include <malloc.h>

typedef unsigned char bool;
#define true 1
#define false 0

bool copy(const char* src, const char* dst);

int main(int argc, char* argv[])
{
    if (argc == 2)
    {
        int fd = open(argv[1], O_CREAT | O_WRONLY | O_TRUNC, S_IRUSR | S_IWUSR);
        lseek(fd, 64, SEEK_SET);
        write(fd, "abc", 3);
    }
    else if (argc > 2)
    {
        bool success = copy(argv[1], argv[2]);
        printf("copy: %s", success ? "success" : "failied");
    }
    return 0;
}

bool copy(const char* src, const char* dst)
{
    int fd_src;
    int fd_dst;


    fd_src = open(src, O_RDONLY, S_IRUSR | S_IWUSR);
    if (fd_src == -1)
        return false;
    fd_dst = open(dst, O_CREAT | O_WRONLY | O_TRUNC, S_IRUSR | S_IWUSR);
    if (fd_dst == -1)
    {
        close(fd_src);
        return false;
    }
    
    char buf[1024];
    int num_read, num_wrote;

    bool error = false;
    while ((num_read = read(fd_src, buf, sizeof(buf))) > 0)
    {
        num_wrote = write(fd_dst, buf, num_read);
        if (num_wrote != num_read)
        {
            error = true;
            break;
        }
    }

    close(fd_src);
    close(fd_dst);

    return (!error);
}
